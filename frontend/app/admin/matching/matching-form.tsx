'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { type MatchRecord } from '@/types/match';
import { type MatchRequestsIndex } from '@/types/match';

type MatchingFormData = {
  matches: MatchRecord[];
};

export default function MatchingForm({
  matchRequestsIndex,
  onSubmit,
}: {
  matchRequestsIndex: MatchRequestsIndex[];
  onSubmit: (matches: MatchRecord[]) => void;
}) {
  const expendMatchRequestsIndex = matchRequestsIndex.flatMap((team) =>
    team.double_header ? [team, { ...team, id: `${team.id}-dh` }] : [team]
  );
  console.log(expendMatchRequestsIndex);

  const form = useForm<MatchingFormData>({
    defaultValues: {
      matches: [{ team1_common: '', team2_common: '', place: '', times: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'matches',
  });

  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  console.log(`selectedTeamsの中身: ${selectedTeams.join(', ')}`);

  const handleSelectChange = (value: string, fieldName: keyof MatchRecord, index: number) => {
    const currentMatch = form.getValues(`matches.${index}`);
    const previousValue = currentMatch[fieldName];

    setSelectedTeams((prev) => {
      let updated = [...prev]; // 現在の選択済みチームをコピー

      // 以前の値を削除 (もし存在する場合)
      if (previousValue) {
        updated = updated.filter((id) => id !== previousValue);
      }

      // 新しい値を追加
      if (value) {
        updated.push(value);
      }

      return updated; // 更新された配列を返す
    });

    // React Hook Form の値を更新
    form.setValue(`matches.${index}.${fieldName}`, value);
  };

  // const onSubmit = async (data: MatchingFormData) => {
  //   console.log("Form Data:", data)

  //   const formattedData = {
  //     matches: data.matches.map((match) => {
  //     const team1 = expendMatchRequestsIndex.find((team) => team.id.toString() === match.team1_common);
  //     const team2 = expendMatchRequestsIndex.find((team) => team.id.toString() === match.team2_common);
  //     return {
  //       ...match,
  //       team1_common: team1 ? team1.common_name : match.team1_common,
  //       team2_common: team2 ? team2.common_name : match.team2_common
  //     };
  //   })};

  //   console.log("Formatted Form Data:", formattedData);
  //   try{
  //     const res = await api.post(`/api/matches`, formattedData)

  //     if (res.status !== 201){
  //       const errorData = res.data;
  //       console.log("Server error:", errorData);
  //       alert(errorData.error || "データ送信に失敗しました。");
  //       return;
  //     }
  //     const result = res.data; // サーバーから返ってきたレスポンスを確認
  //     console.log("Response Data:", result);
  //     alert("データ送信に成功しました");
  //     router.push("/games/matching")
  //   } catch (error){
  //     console.error("Error submitting form data:", error);
  //     ("データ送信に失敗しました。");
  //   }
  // }

  const handleSubmit = (data: MatchingFormData) => {
    const formattedData = {
      matches: data.matches.map((match) => {
        const team1 = expendMatchRequestsIndex.find(
          (team) => team.id.toString() === match.team1_common
        );
        const team2 = expendMatchRequestsIndex.find(
          (team) => team.id.toString() === match.team2_common
        );
        return {
          team1_common: team1 ? team1.common_name : match.team1_common,
          team2_common: team2 ? team2.common_name : match.team2_common,
          place: match.place,
          times: match.times,
          league: `${team1?.category} ${team1?.division}部` || '',
          date: team1?.requested_date ?? '',
        };
      }),
    };

    onSubmit(formattedData.matches);
  };

  const getTeamOptions = (currentValue: string | undefined) => {
    return expendMatchRequestsIndex.filter(
      (team) => !selectedTeams.includes(team.id.toString()) || team.id.toString() === currentValue
    );
  };

  const timeOptions = () => {
    const startHour = 8;
    const endHour = 18;
    const intervalMinutes = 30;

    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return times;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2 max-w-full px-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <h2 className="text-center font-semibold text-sm">{index + 1}</h2>
            <FormField
              control={form.control}
              name={`matches.${index}.team1_common`}
              rules={{
                required: 'テームを選択してください',
              }}
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="w-[200px]">
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleSelectChange(value, 'team1_common', index);
                          field.onChange(value);
                        }}
                        value={field.value || ''}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="チームを選択">
                            {expendMatchRequestsIndex.find(
                              (team) => team.id.toString() === field.value
                            )?.common_name ?? 'チームを選択してください'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {getTeamOptions(field.value).map((team) => (
                            <SelectItem key={team.id} value={team.id.toString()}>
                              {team.common_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                );
              }}
            />
            <h1 className="">対</h1>
            <FormField
              control={form.control}
              name={`matches.${index}.team2_common`}
              rules={{
                required: 'チームを選択してください',
                validate: (value) => {
                  const team1 = expendMatchRequestsIndex.find(
                    (team) => team.id.toString() === form.getValues(`matches.${index}.team1_common`)
                  );

                  const team2 = expendMatchRequestsIndex.find(
                    (team) => team.id.toString() === value
                  );

                  if (!team1 || !team2) {
                    return true; // どちらかが未選択の場合、スキップ
                  }

                  if (team1.common_name === team2.common_name) {
                    return 'チーム１と異なるチームを選択してください';
                  }

                  if (team1.category !== team2.category || team1.division !== team2.division) {
                    return '同じリーグのチームを選択してください';
                  }
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="w-[200px]">
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleSelectChange(value, 'team2_common', index);
                          field.onChange(value);
                        }}
                        value={field.value || ''}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="チームを選択">
                            {expendMatchRequestsIndex.find(
                              (team) => team.id.toString() === field.value
                            )?.common_name ?? 'チームを選択してください'}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {getTeamOptions(field.value).map((team) => (
                            <SelectItem key={team.id} value={team.id.toString()}>
                              {team.common_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={`matches.${index}.place`}
              rules={{
                required: '会場を選択してください',
              }}
              render={({ field, fieldState }) => (
                <FormItem className="w-[200px]">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="会場を選択">{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="大宮健保グラウンド">大宮健保グラウンド</SelectItem>
                        <SelectItem value="三芳球場">三芳球場</SelectItem>
                        <SelectItem value="東綾瀬グラウンド">東綾瀬グラウンド</SelectItem>
                        <SelectItem value="サンケイスポーツセンター">
                          サンケイスポーツセンター
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`matches.${index}.times`}
              rules={{
                required: '時間を選択してください',
              }}
              render={({ field, fieldState }) => (
                <FormItem className="w-[150px]">
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="">
                      <SelectTrigger>
                        <SelectValue placeholder="時間を選択">{field.value}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions().map((time, index) => {
                          return (
                            <SelectItem key={index} value={time}>
                              {time}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                  )}
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => {
                const matchToRemove = form.getValues(`matches.${index}`);
                setSelectedTeams((prev) =>
                  prev.filter(
                    (team) =>
                      team !== matchToRemove.team1_common && team !== matchToRemove.team2_common
                  )
                );
                remove(index);
              }}
            >
              セット削除
            </Button>
          </div>
        ))}
        <div className="space-x-4 pt-4">
          <Button
            type="button"
            onClick={() =>
              append({
                team1_common: '',
                team2_common: '',
                place: '',
                times: '',
                league: '',
                date: '',
              })
            }
          >
            セット追加
          </Button>

          <Button type="submit">組み合わせ決定</Button>
        </div>
      </form>
    </Form>
  );
}
