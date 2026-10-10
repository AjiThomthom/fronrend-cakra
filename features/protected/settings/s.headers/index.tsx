import { Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BreadCrumbsSettings() {
  const params = useParams();
  return (
    <Breadcrumbs aria-label="breadcrumb" className="mb-4">
      <Link
        href={`/${params.slugs}/home`}
        className="text-gray-600 hover:underline"
      >
        Home
      </Link>
      <Typography color="success">Settings</Typography>
    </Breadcrumbs>
  );
}
