import Loading from "@/components/Loading";

export default function FeedbackLoading() {
  return (
    <div className="section-feedback">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loading size="large" text="Loading feedback..." />
      </div>
    </div>
  );
}
