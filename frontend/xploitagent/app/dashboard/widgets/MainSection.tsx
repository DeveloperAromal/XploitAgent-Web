"use client";
import { useEffect, useState } from "react";
import { Link, FileCheck, XCircle, ChevronRight, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function MainSection() {
  const [urlInput, setUrlInput] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>(""); 
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error" | "validating"
  >("idle");
  const [message, setMessage] = useState<string>("");
  const [step, setStep] = useState<1 | 2>(1);
  const [clientId, setClientId] = useState("");

  const router = useRouter();

  // Define the base URL for API requests
  const BASE_URL = process.env.APP_BASE_URL || "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const validationRes = await axios.get(
          `${BASE_URL}/api/v1/admin/validate`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const client_id =
          validationRes.data.user.user.additionalData?.[0]?.client_id;
        setClientId(client_id);
      } catch (error) {
        console.error("Failed to fetch client ID:", error);
      }
    };
    fetchData();
  }, [BASE_URL]); 

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setSubmissionStatus("idle");
    setMessage("");
  };

  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
    setSubmissionStatus("idle");
    setMessage("");
  };

  const handleProjectDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProjectDescription(e.target.value);
    setSubmissionStatus("idle");
    setMessage("");
  };

  const handleSubmitUrl = async () => {
    if (!urlInput.trim()) {
      setSubmissionStatus("error");
      setMessage("Please enter a valid URL for scanning.");
      return;
    }

    setSubmissionStatus("validating");
    setMessage("Validating URL...");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStep(2);
      setSubmissionStatus("idle");
      setMessage("");
    } catch (error) {
      setSubmissionStatus("error");
      setMessage("Failed to validate URL. Please try again.");
      console.error("URL validation error:", error);
    }
  };

  const handleSubmitDetails = async () => {
    if (!projectName.trim()) {
      setSubmissionStatus("error");
      setMessage("Project name is required.");
      return;
    }

    setSubmissionStatus("validating");
    setMessage("Submitting project details and initiating scan...");

    try {
      const token = localStorage.getItem("access_token");
      const projectSubmissionEndpoint = `${BASE_URL}/api/v1/insert/start-new-attack`;

      const payload = {
        target: urlInput,
        attack_name: projectName,
        client_id: clientId,
      };

      const response = await axios.post(projectSubmissionEndpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Submission successful:", response.data);

      router.push(`/dashboard/security/checking/${response.data[0].attack_id}`);
      setSubmissionStatus("success");
      setMessage(`Scan for "${projectName}" initiated successfully!`);
      setUrlInput("");
      setProjectName("");
      setProjectDescription("");
      setStep(1);
    } catch (error) {
      setSubmissionStatus("error");
      setMessage("Failed to initiate scan. Please try again.");
      console.error("Details submission error:", error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 opacity-90"></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-emerald-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="w-96 h-96 bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="w-96 h-96 bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 bg-opacity-80 text-center w-full max-w-2xl rounded-xl">
        {step === 1 && (
          <>
            <Link className="w-20 h-20 text-neutral-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Step 1: Provide Repository Link
            </h2>
            <p className="text-neutral-300 text-lg mb-8 max-w-md">
              Enter the URL of your project repository for a comprehensive
              vulnerability assessment.
            </p>

            <div className="w-full flex flex-col gap-4 items-center">
              <div className="relative flex items-center w-full">
                <Link className="absolute left-4 text-neutral-500 w-5 h-5" />
                <input
                  type="url"
                  placeholder="Enter repository URL (e.g., https://github.com/user/repo)"
                  value={urlInput}
                  onChange={handleUrlChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600 outline-none transition-all duration-200 text-base"
                  spellCheck="false"
                />
              </div>
              <button
                onClick={handleSubmitUrl}
                disabled={submissionStatus === "validating"}
                className={`w-full py-3 px-6 rounded-xl text-lg font-bold flex items-center justify-center gap-2
                  ${
                    submissionStatus === "validating"
                      ? "bg-blue-800 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                  }`}
              >
                {submissionStatus === "validating" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Validating...
                  </>
                ) : (
                  <>
                    Next Step <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <Info className="w-20 h-20 text-purple-400 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Step 2: Add Project Details
            </h2>
            <p className="text-neutral-300 text-lg mb-8 max-w-md">
              Provide some basic information about your project to help us with
              the scan.
            </p>

            <div className="w-full flex flex-col gap-4 items-center">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Project Name (e.g., My Awesome App)"
                  value={projectName}
                  onChange={handleProjectNameChange}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600 outline-none transition-all duration-200 text-base"
                />
              </div>
              <div className="relative w-full">
                <textarea
                  placeholder="Project Description (optional)"
                  value={projectDescription}
                  onChange={handleProjectDescriptionChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 text-white placeholder-neutral-500 border border-neutral-700 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600 outline-none transition-all duration-200 text-base resize-y"
                ></textarea>
              </div>
              <button
                onClick={handleSubmitDetails}
                disabled={submissionStatus === "validating"}
                className={`w-full py-3 px-6 rounded-xl text-lg font-bold transition-colors duration-200 flex items-center justify-center gap-2
                  ${
                    submissionStatus === "validating"
                      ? "bg-blue-800 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                  }`}
              >
                {submissionStatus === "validating" ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Initiating Scan...
                  </>
                ) : (
                  "Start Scan"
                )}
              </button>
            </div>
          </>
        )}

        {submissionStatus !== "idle" && message && (
          <div
            className={`mt-4 p-3 rounded-lg w-full text-center flex items-center justify-center gap-2 text-sm animate-fade-in
            ${
              submissionStatus === "success"
                ? "bg-emerald-900 text-emerald-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {submissionStatus === "success" ? (
              <FileCheck className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {message}
          </div>
        )}
      </div>
    </section>
  );
}
