"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  double_header: boolean;
  team_id: string;
};

export default function MatchRequests() {
  const { registar, handleSubmit } = useForm<FormData>();

  const [selected, setSelected] = useState("選択してください");
  const OPTIONS = ["試合を希望する", "試合を希望しない"];
  const [double, setDouble] = useState("希望しません")
  const double_header = ["希望します", "希望しません"]
  const onChange = (e: any) => setDouble(e.target.value);
  return (
    <>
      <h1>試合申し込み</h1>
      <p>12月8日(日)</p>
      <select className="text-black" value={selected} onChange={(e) => setSelected(e.target.value)}>
        {OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <p>ダブルヘッダー</p>
      {double_header.map((value) => {
        return (
          <label key={value}>
            <input
              type="radio"
              value={value}
              checked={double === value}
              onChange={onChange} />
            {value}</label>
        )
      })}
      <Button type="submit">送信</Button>



    </>
  )
}