"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  doubleType: boolean;
  actionType: string;
};

export default function MatchRequests() {
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      actionType: "試合を希望する",
      doubleType: false,
    },
  });




  const onSubmit = async (data: FormData) => {
    const endpoint = data.actionType === "試合を希望する"
      ? `http://localhost:3000/api/match_requests`
      : `http://localhost:3000/api/match_requests/2`;

    const method = data.actionType === "試合を希望する" ? "POST" : "DELETE";

    console.log("Endpoint:", endpoint);
    const res = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ double_header: data.doubleType }),
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
          name="actionType"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>試合申し込み</FormLabel>
                <FormLabel>12月10日(仮)</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue="">
                    <SelectTrigger>
                      <SelectValue placeholder="試合を希望する" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="試合を希望する">試合を希望する</SelectItem>
                      <SelectItem value="試合を希望しない">試合を希望しない</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )

          }}
        />
        <FormField
          control={form.control}
          name="doubleType"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>ダブルヘッダー</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue="false"
                  >
                    <div className="flex space-x-4">
                      <div>
                        <RadioGroupItem value="true" id="radio-yes" />
                        <label htmlFor="radio-yes" className="ml-2">希望する</label>
                      </div>
                      <div>
                        <RadioGroupItem value="false" id="radio-no" />
                        <label htmlFor="radio-no" className="ml-2">希望しない</label>
                      </div>
                    </div>
                  </RadioGroup>
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