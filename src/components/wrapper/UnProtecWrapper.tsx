import { UserAuth, UserRole } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

interface UnProtectWrapperProps {}

const UnProtectWrapper: React.FunctionComponent<
  UnProtectWrapperProps & React.PropsWithChildren
> = ({ children }) => {
  const { role } = UserAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (role === -1) {
      return;
    }

    switch (role) {
      case UserRole.Student:
        router.push("/courses");
        break;
      case UserRole.Mentor:
        router.push("/instructorcourses");
        break;
      case UserRole.Staff:
        router.push("/staff-page");
        break;
      case UserRole.Admin:
        router.push("/user-manage");
        break;
      default:
        router.push("/");
        break;
    }
  }, [role]);
  return <>{children}</>;
};

export default UnProtectWrapper;
