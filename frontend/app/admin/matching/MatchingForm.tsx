"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

type MatchRecord = {
  team1_common: string;
  team2_common: string;
  place: string;
  times: string;
}

type MatchRequestsIndex = {
  id: number | string;
  common_name: string;
  category: string;
  division: number;
  requested_date: string;
  double_header: boolean;
}

type MatchingFormData = {
  matches: MatchRecord[];
}


export default function MatchingForm({ matchRequestsIndex }: { matchRequestsIndex: MatchRequestsIndex[] }) {
  const router = useRouter()
  const expendMatchRequestsIndex = matchRequestsIndex.flatMap((team) =>
    team.double_header ? [team, { ...team, id: `${team.id}-dh` }] : [team]
  )
  console.log(expendMatchRequestsIndex)

  const form = useForm<MatchingFormData>({
    defaultValues: {
      matches: [
        { team1_common: "", team2_common: "", place: "", times: ""},
      ],
    },
  });

  const { fields, append, remove} = useFieldArray({
    control: form.control,
    name: "matches"
  })

  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  console.log(`selectedTeamsの中身: ${selectedTeams}`)

  

  const handleSelectChange = (value: string, fieldName: keyof MatchRecord, index: number) => {
    const currentMatch = form.getValues(`matches.${index}`)
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

  const onSubmit = async (data: MatchingFormData) => {
    console.log("Form Data:", data)

    const formattedData = {
      matches: data.matches.map((match) => {
      const team1 = expendMatchRequestsIndex.find((team) => team.id.toString() === match.team1_common);
      const team2 = expendMatchRequestsIndex.find((team) => team.id.toString() === match.team2_common);
      return {
        ...match,
        team1_common: team1 ? team1.common_name : match.team1_common,
        team2_common: team2 ? team2.common_name : match.team2_common
      };
    })};
  
    console.log("Formatted Form Data:", formattedData);
    try{
      const res = await fetch(`http://localhost:3000/api/matches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData)
      })

      if (!res.ok){
        const errorData = await res.json();
        console.log("Server error:", errorData);
        alert(errorData.error || "データ送信に失敗しました。");
        return;
      }
      const result = await res.json(); // サーバーから返ってきたレスポンスを確認
      console.log("Response Data:", result);
      alert("データ送信に成功しました");
      router.push("/games")
    } catch (error){
      console.error("Error submitting form data:", error);
      alert("データ送信に失敗しました。");
    }
    
  }

  const getTeamOptions = (currentValue: string | undefined) => {
    return expendMatchRequestsIndex.filter(
      (team) => !selectedTeams.includes(team.id.toString()) || team.id.toString() === currentValue
    )
  };

  const timeOptions = () => {
    const startHour = 8;
    const endHour = 18;
    const intervalMinutes = 30;
  
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }
  
    return times;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4">
            <h2 className="text-lg font-semibold">マッチセット {index + 1}</h2>
            <FormField
              control={form.control}
              name={`matches.${index}.team1_common`}
              rules={{
                required: "テームを選択してください"
              }}
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleSelectChange(value, "team1_common", index)
                          field.onChange(value)
                        }}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="チームを選択してください">
                            {expendMatchRequestsIndex.find((team) => team.id.toString() === field.value)?.common_name || "チームを選択してください"}
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
                )
              }}
            />   
            <h1 className="ml-4 mr-4">対</h1>
            <FormField
              control={form.control}
              name={`matches.${index}.team2_common`}
              rules={{
                required: "チームを選択してください",
                validate: (value) => {
                  const team1 = expendMatchRequestsIndex.find(
                    (team) => team.id.toString() === form.getValues(`matches.${index}.team1_common`)
                  )

                  const team2 = expendMatchRequestsIndex.find(
                    (team) => team.id.toString() === value
                  )

                  if (!team1 || !team2) {
                    return true; // どちらかが未選択の場合、スキップ
                  }

                  if (team1.common_name === team2.common_name) {
                    return "チーム１と異なるチームを選択してください"
                  }
                  
                  if (team1.category !== team2.category || team1.division !== team2.division){
                    return "同じリーグのチームを選択してください"
                  }
                  
                  }
              }}
              render={({ field, fieldState }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleSelectChange(value, "team2_common", index)
                          field.onChange(value)
                        }}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="チームを選択してください">
                            {expendMatchRequestsIndex.find((team) => team.id.toString() === field.value)?.common_name || "チームを選択してください"}
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
                )
              }}
            />
            <FormField 
              control={form.control}
              name={`matches.${index}.place`}
              rules={{
                required: "会場を選択してください"
              }}
              render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue=""
                        >
                        <SelectTrigger>
                          <SelectValue placeholder= "会場を選択してください">{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="大宮健保グラウンド">大宮健保グラウンド</SelectItem>
                          <SelectItem value="三芳球場">三芳球場</SelectItem>
                          <SelectItem value="東綾瀬グラウンド">東綾瀬グラウンド</SelectItem>
                          <SelectItem value="サンケイスポーツセンター">サンケイスポーツセンター</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {fieldState.error &&(
                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                    )}
                  </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name={`matches.${index}.times`}
              rules={{
                required: "時間を選択してください"
              }}
              render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue=""
                        >
                        <SelectTrigger>
                          <SelectValue placeholder= "時間を選択してください">{field.value}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions().map((time, index) => {
                            return(
                              <SelectItem key={index} value={time}>{time}</SelectItem>
                            )
                          })}
                          
                        </SelectContent>
                      </Select>
                    </FormControl>
                    {fieldState.error &&(
                      <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                    )}
                  </FormItem>
              )}
            />

            <Button 
            type="button" 
            onClick={() => {
              const matchToRemove = form.getValues(`matches.${index}`)
              setSelectedTeams((prev) =>
                prev.filter(
                  (team) => team !== matchToRemove.team1_common && team !== matchToRemove.team2_common
                )
              )
              remove(index)}
            }>
              セット削除
            </Button>
          </div>
        ))} 
        <Button type="button" onClick={() => append({ team1_common: "", team2_common: "", place: "", times:"" })}>
          セット追加
        </Button>

        <Button type="submit">組み合わせ決定</Button>

      </form>
    </Form >

  )
}