import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import { LogOutIcon, Trash } from "lucide-react";
import { DetailAgencyForm } from "../s.form/form-detail";
import { useTokenJWT } from "@/context/user.context";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { DialogsOutAgency } from "../s.dialogs/dialogs.out.agency";
import { DialogsDeleteAgency } from "../s.dialogs/dialogs.delete.agency";
import { useEmployeContext } from "../../employee/em.hooks/em.hooks";
import { useEffect, useState } from "react";
import { allAccountsUsers } from "@/services/accounts.service";
import { EmployeeType } from "@/@types/account.type";

export const AgencyDetailComponents = () => {
  const user = useTokenJWT();
  const router = useRouter();
  const params = useParams();
  const set = useSearchParams().get("set");
  if (!user) return null;

  const [members, setMembers] = useState<EmployeeType[]>([]);
  const getMembers = async () => {
    const response = await allAccountsUsers(params.slugs as string);
    if (!response) return null;
    setMembers(response.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  console.log(members);
  return (
    <Box>
      <div className="flex justify-between">
        <div className="w-52">
          <Typography variant="h6" className="font-bold mb-4">
            Detail Lembaga
          </Typography>
          <Typography variant="body2" className="text-gray-500 mb-6">
            Kelola informasi publik dan data utama lembaga Anda.
          </Typography>
        </div>

        <div className="flex flex-row">
          <Tooltip title="Hapus Lembaga">
            <Button
              variant="text"
              disabled={user.role != "OWNER" ? true : false}
              color="error"
              onClick={() => router.push(`?set=${set}&act=delete`)}
            >
              <Trash size={18} />
            </Button>
          </Tooltip>

          <Tooltip title="Keluar dari Lembaga">
            <Button
              color="error"
              disabled={members.length == 0 ? true : false}
              onClick={() => router.push(`?set=${set}&act=leave`)}
              variant="text"
            >
              <LogOutIcon size={18} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <Box className="flex flex-col my-4 gap-5 w-full md:w-full">
        <DetailAgencyForm />
      </Box>
      <DialogsDeleteAgency />
      <DialogsOutAgency data={members} />
    </Box>
  );
};
