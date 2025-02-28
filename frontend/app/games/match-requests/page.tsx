"use client"

import api from "@/app/utils/api";
import { teamIdAtom } from "@/app/utils/store/atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { useAtom } from "jotai/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useResetAuth from "@/hooks/useResetAuth";
import { useEffect } from "react";

type FormData = {
  doubleType: boolean;
  actionType: string;
};

export default function MatchRequests() {
  const [teamId] = useAtom(teamIdAtom);
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      actionType: "試合を希望する",
      doubleType: false,
    },
  });

  const { resetAuth } = useResetAuth();
  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    if (!token) {
      toast.error("認証情報が不足しています。ログインしてください。");
      resetAuth();
      return;
    }
  },[]);


  const onSubmit = async (data: FormData) => {
    const endpoint = data.actionType === "試合を希望する"
      ? `/api/match_requests`
      : `/api/match_requests/${teamId}`;

    const method = data.actionType === "試合を希望する" ? "POST" : "DELETE";
    try {
      await api({
        url: endpoint,
        method: method,
        data: { double_header: data.doubleType },
      });

      alert('試合届を提出しました');
      router.push("/teams");
    } catch (error) {
      console.error("送信失敗:", error);
      alert("送信失敗");
    }
    console.log("送信データ:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-5 max-w-md mx-auto">
        <h1 className="text-2xl text-center">試合申し込み</h1>
        <Card className= "*:p-6">
          <CardContent>
            {/* 試合申し込み */}
            <FormField
              control={form.control}
              name="actionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-900">3月1日(土)</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue="試合を希望する">
                      <SelectTrigger>
                        <SelectValue placeholder="試合を希望する" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="試合を希望する">試合を希望する</SelectItem>
                        <SelectItem value="試合を希望しない">試合を取り消す</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ダブルヘッダー */}
            <FormField
              control={form.control}
              name="doubleType"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>ダブルヘッダー</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        console.log("選択した値:", value);
                        field.onChange(value === "true")}
                      }
                      value={field.value === true ? "true" : "false"}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="true" 
                          id="radio-yes" 
                          className="data-[state=checked]:bg-white data-[state=checked]:ring data-[state=checked]:ring-blue-400"
                        />
                        <label htmlFor="radio-yes">希望する</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="false" 
                          id="radio-no" 
                          className="data-[state=checked]:bg-white data-[state=checked]:ring data-[state=checked]:ring-blue-400"
                        />
                        <label htmlFor="radio-no">希望しない</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ボタンエリア */}
            <div className="flex justify-center space-x-6 mt-6">
              <Button asChild className="px-6 py-2 hover:bg-zinc-800 hover:text-white">
                <Link href="/teams">閉じる</Link>
              </Button>
              <Button type="submit" className="px-6 py-2 hover:bg-zinc-800 hover:text-white">送信</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}