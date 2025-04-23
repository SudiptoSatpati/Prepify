import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewByUserId,
  getLatestInterviews,
} from "@/lib/actions/auth.action";
import { dummyInterviews } from "@/constants";
import InterviewCard from "@/components/InterviewCard";

const page = async () => {
  const user = await getCurrentUser();

  // If no user is logged in, show only the CTA section
  if (!user) {
    return (
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get interview ready with AI-powered preparation and feedback.</h2>
          <p className="text-lg">
            Practice on real interview question and get real authentic feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/auth/signin">Sign in to Start</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={500}
          height={500}
          style={{ width: "auto", height: "auto" }}
          className="max-sm:hidden"
        />
      </section>
    );
  }

  // Fetch interviews only if user is authenticated
  let userInterviews: Interview[] = [];
  let latestInterviews: Interview[] = [];

  try {
    const [userInterviewsResult, latestInterviewsResult] = await Promise.all([
      getInterviewByUserId(user.id),
      getLatestInterviews({
        userId: user.id,
      }),
    ]);

    userInterviews = userInterviewsResult || [];
    latestInterviews = latestInterviewsResult || [];
  } catch (error) {
    console.error("Error fetching interviews:", error);
  }

  const hasPastInterviews = userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews.length > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get interview ready with AI-powered preparation and feedback.</h2>
          <p className="text-lg">
            Practice on real interview question and get real authentic feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={500}
          height={500}
          style={{ width: "auto", height: "auto" }}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {/* <p>You haven&apos;t taken any interviews yet.</p> */}
          {hasPastInterviews ? (
            userInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet.</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default page;
