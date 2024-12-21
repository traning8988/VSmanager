"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type ReportFormData = {
  reportingTeamName: string;
  opponentTeamName: string;
  reportingTeamScore: number;
  opponentTeamScore: number;
};

export default function MatchReports() {
  const router = useRouter();
  const form = useForm<ReportFormData>({
    defaultValues: {
      reportingTeamName: "",
      opponentTeamName: "",
      reportingTeamScore: 0,
      opponentTeamScore: 0
    },
  });




  const onSubmit = async (data: ReportFormData) => {
    const res = await fetch(`http://localhost:3000/api/match_reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ opponent_team_name: data.opponentTeamName }),
    })
    if (res.ok) {
      alert("送信成功")
      router.push("/games")
    } else {
      alert("送信失敗")
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="opponentTeamName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>試合結果</FormLabel>
                <FormLabel>12月10日(仮)</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue="選択してください">
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="対戦相手１">対戦相手１</SelectItem>
                      <SelectItem value="対戦相手２">対戦相手２</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )

          }}
        />
        <FormField
          control={form.control}
          name="reportingTeamName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>自チーム名</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="0" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="0">0</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <Button asChild>
          <Link href="/games">閉じる</Link >
        </Button>
        <Button type="submit">送信</Button>

      </form>
    </Form >

  )
}