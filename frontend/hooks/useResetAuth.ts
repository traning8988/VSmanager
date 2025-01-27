import { isLoggedInAtom, teamCommonNameAtom, teamIdAtom } from "@/app/utils/store/atoms";
import { useAtom } from "jotai/react";
import { useRouter } from "next/navigation";

export default function useResetAuth (): { resetAuth: () => void } {
  const [, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [, setTeamId] = useAtom(teamIdAtom);
  const [, setCommonName] = useAtom(teamCommonNameAtom);
  const router = useRouter();

  const resetAuth = () => {
    localStorage.removeItem("jwt-token");
    setIsLoggedIn(false);
    setTeamId(null);
    setCommonName('');
    router.push('/sign-in');
    console.log("認証情報をリセットしました。");
  }
  return { resetAuth };
};