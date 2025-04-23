import Loading from "@/components/Loading";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loading size="large" text="Loading dashboard..." />
    </div>
  );
}
