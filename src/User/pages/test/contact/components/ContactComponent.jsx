import React, { useState, useRef, useEffect } from "react";
import ModernMultiSelect from "./MultipleCoolSelect";

const DevOpsExpertiseCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      clearTimeout(hoverTimeoutRef.current);
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
      }, 300); // Slight delay to prevent flickering when moving between elements
    };

    const cardElement = cardRef.current;
    if (cardElement) {
      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      clearTimeout(hoverTimeoutRef.current);
      if (cardElement) {
        cardElement.removeEventListener("mouseenter", handleMouseEnter);
        cardElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <main className="w-[100vw] ">
      <div className=" mx-auto" ref={cardRef}>
        <div
          className={`relative pt-16 p-10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            isHovered
              ? "bg-gradient-to-br from-gray-900 via-blue-900/90 to-indigo-900 shadow-2xl shadow-teal-500/20 ring-2 ring-blue-500/30"
              : "bg-gray-900 shadow-xl shadow-gray-800/20 ring-1 ring-gray-700/50"
          }`}
        >
          {/* Animated gradient background */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isHovered ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-gray-900 to-indigo-900/30"></div>
          </div>

          {/* Grid pattern overlay */}
          <div
            className={`absolute inset-0 opacity-10 transition-all duration-1000 ${
              isHovered ? "opacity-20" : "opacity-5"
            }`}
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              backgroundColor: "rgba(10, 5, 20, 0.9)",
              boxShadow: "inset 0 0 20px rgba(0, 200, 255, 0.3)",
              textShadow: "0 0 5px rgba(0, 255, 255, 0.5)",
            }}
          ></div>

          <div className="relative z-10">
            {/* Header Section */}
            <div className="mb-12 ">
              <div className="flex items-center mb-6">
                <div
                  className={`w-3 h-16  rounded-full mr-5 transition-all duration-700 ${
                    isHovered
                      ? "bg-gradient-to-b from-teal-400 to-blue-400"
                      : "bg-gray-700"
                  }`}
                ></div>
                <div>
                  <h2
                    className={`text-4xl font-bold tracking-tight transition-all duration-700 ${
                      isHovered ? "text-white" : "text-gray-100"
                    }`}
                  >
                    Cloud & DevOps Engineering
                  </h2>
                  <div
                    className={`h-1 mt-2 rounded-full transition-all duration-700 ${
                      isHovered ? "w-24 bg-teal-400" : "w-16 bg-gray-600"
                    }`}
                  ></div>
                </div>
              </div>

              <p
                className={`text-xl leading-relaxed ml-8 max-w-4xl transition-all duration-700 ${
                  isHovered ? "text-gray-300" : "text-gray-400"
                }`}
              >
                Enterprise infrastructure solutions with expertise in cloud
                architecture, automation, and scalable system design for
                mission-critical environments.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
              {/* Cloud Platforms */}
              <div
                className={`rounded-2xl p-7 transform transition-all duration-500 border ${
                  isHovered
                    ? "bg-gray-800/50 backdrop-blur-sm border-teal-500/30 shadow-lg shadow-teal-900/20"
                    : "bg-gray-800/30 border-gray-700"
                }`}
              >
                <div className="flex  items-center mb-5">
                  <div
                    className={`w-12 h-12  flex items-center justify-center rounded-xl mr-4 transition-all duration-500 ${
                      isHovered
                        ? "bg-teal-900/50 text-teal-300"
                        : "bg-gray-700/80 text-teal-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold transition-all duration-500 ${
                      isHovered ? "text-teal-300" : "text-gray-200"
                    }`}
                  >
                    Cloud Platforms
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    "AWS",
                    "GCP",
                    "Azure",
                    "OCI",
                    "DigitalOcean",
                    "Linode",
                    "Kubernetes",
                    "OpenStack",
                  ].map((item, index) => (
                    <span
                      key={item}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        isHovered
                          ? "bg-teal-900/40 text-teal-100 border border-teal-800/50"
                          : "bg-gray-700/60 text-gray-200 border border-gray-600/30"
                      }`}
                      style={{
                        transitionDelay: isHovered ? `${index * 50}ms` : "0ms",
                        transitionDuration: "400ms",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Infrastructure as Code */}
              <div
                className={`rounded-2xl p-7 transform transition-all duration-500 border ${
                  isHovered
                    ? "bg-gray-800/50 backdrop-blur-sm border-blue-500/30 shadow-lg shadow-blue-900/20"
                    : "bg-gray-800/30 border-gray-700"
                }`}
              >
                <div className="flex items-center mb-5">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mr-4 transition-all duration-500 ${
                      isHovered
                        ? "bg-blue-900/50 text-blue-300"
                        : "bg-gray-700/80 text-blue-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold transition-all duration-500 ${
                      isHovered ? "text-blue-300" : "text-gray-200"
                    }`}
                  >
                    Infrastructure as Code
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Terraform",
                    "Pulumi",
                    "Ansible",
                    "Crossplane",
                    "CDK",
                    "CloudFormation",
                    "Bicep",
                    "SaltStack",
                  ].map((item, index) => (
                    <span
                      key={item}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        isHovered
                          ? "bg-blue-900/40 text-blue-100 border border-blue-800/50"
                          : "bg-gray-700/60 text-gray-200 border border-gray-600/30"
                      }`}
                      style={{
                        transitionDelay: isHovered ? `${index * 30}ms` : "0ms",
                        transitionDuration: "400ms",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Observability */}
              <div
                className={`rounded-2xl p-7 transform transition-all duration-500 border ${
                  isHovered
                    ? "bg-gray-800/50 backdrop-blur-sm border-indigo-500/30 shadow-lg shadow-indigo-900/20"
                    : "bg-gray-800/30 border-gray-700"
                }`}
              >
                <div className="flex items-center mb-5">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mr-4 transition-all duration-500 ${
                      isHovered
                        ? "bg-indigo-900/50 text-indigo-300"
                        : "bg-gray-700/80 text-indigo-400"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3
                    className={`text-xl font-semibold transition-all duration-500 ${
                      isHovered ? "text-indigo-300" : "text-gray-200"
                    }`}
                  >
                    Observability
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Prometheus",
                    "Grafana",
                    "ELK",
                    "OpenTelemetry",
                    "Datadog",
                    "New Relic",
                    "Splunk",
                    "Loki",
                  ].map((item, index) => (
                    <span
                      key={item}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                        isHovered
                          ? "bg-indigo-900/40 text-indigo-100 border border-indigo-800/50"
                          : "bg-gray-700/60 text-gray-200 border border-gray-600/30"
                      }`}
                      style={{
                        transitionDelay: isHovered ? `${index * 30}ms` : "0ms",
                        transitionDuration: "400ms",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ModernMultiSelect />

            {/* Filter- Done Responsive */}
            <div className="grid my-2 place-content-center place-items-center grid-cols-1  gap-4 items-center">
              {/* Right: Filter Controls */}
              <div className="flex w-full items-center justify-center sm:justify-center md:justify-end  px-2 py-1 gap-3 ">
                {/* Map View Toggle */}
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultValue=""
                    className="sr-only peer"
                  />
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Map view
                  </span>
                  <div className="relative border-none w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] peer-checked:after:bg-green-500 after:bg-gray-400 after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-300" />
                </label>
                {/* Verified Only Toggle */}
                <label className="inline-flex gap-2 items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultValue=""
                    className="sr-only peer"
                  />
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Verified only
                  </span>
                  <div className="relative border-none w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] peer-checked:after:bg-green-500 after:bg-gray-400 after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-300" />
                </label>
              </div>
              {/* Dropdown with Responsive Width */}
              {/* Left: Search Result Text */}
              <div className="text-start">
                <div className="text-sm text-gray-800/70">
                  Showing{" "}
                  <span className="text-blue-500 underline font-bold">267</span>{" "}
                  search results
                </div>
              </div>
            </div>

            {/* DevOps Practices */}
            <div className="mb-12">
              <div className="flex items-center mb-8">
                <div
                  className={`w-2 h-12 rounded-full mr-5 transition-all duration-700 ${
                    isHovered
                      ? "bg-gradient-to-b from-teal-400 to-blue-400"
                      : "bg-gray-700"
                  }`}
                ></div>
                <h3
                  className={`text-2xl font-bold tracking-tight transition-all duration-700 ${
                    isHovered ? "text-white" : "text-gray-100"
                  }`}
                >
                  DevOps Methodologies
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  {
                    name: "CI/CD Pipelines",
                    icon: "🔄",
                    desc: "Automated build, test, deploy workflows",
                  },
                  {
                    name: "GitOps",
                    icon: "🔀",
                    desc: "Declarative infrastructure management",
                  },
                  {
                    name: "SRE",
                    icon: "📈",
                    desc: "Service level objectives & error budgets",
                  },
                  {
                    name: "FinOps",
                    icon: "💰",
                    desc: "Cloud cost optimization strategies",
                  },
                ].map((item, index) => (
                  <div
                    key={item.name}
                    className={`rounded-xl p-5 transform transition-all border ${
                      isHovered
                        ? "bg-gray-800/60 backdrop-blur-sm border-blue-500/30 shadow-lg -translate-y-1"
                        : "bg-gray-800/30 border-gray-700"
                    }`}
                    style={{
                      transitionDelay: isHovered ? `${index * 50}ms` : "0ms",
                      transitionDuration: "500ms",
                    }}
                  >
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-xl mb-4 text-3xl transition-all duration-500 ${
                        isHovered
                          ? "bg-blue-900/40 text-blue-300"
                          : "bg-gray-700/60 text-gray-300"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <h4
                      className={`text-lg font-semibold mb-2 transition-all duration-500 ${
                        isHovered ? "text-white" : "text-gray-200"
                      }`}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={`text-sm transition-all duration-500 ${
                        isHovered ? "text-gray-300" : "text-gray-400"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className={`mt-14 pt-10 border-t transition-all duration-700 ${
                isHovered ? "border-teal-500/20" : "border-gray-700"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <h4
                    className={`text-lg font-semibold mb-3 transition-all duration-700 ${
                      isHovered ? "text-teal-300" : "text-gray-300"
                    }`}
                  >
                    Proven Enterprise Results
                  </h4>
                  <p
                    className={`text-base leading-relaxed transition-all duration-700 ${
                      isHovered ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    Designed and implemented infrastructure solutions reducing
                    deployment times by 75% while improving system reliability
                    to 99.99% uptime across global deployments.
                  </p>
                </div>
                <button
                  className={`px-8 py-3.5 rounded-xl font-medium flex items-center transition-all duration-500 ${
                    isHovered
                      ? "bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-xl shadow-teal-500/30 hover:shadow-teal-500/50"
                      : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  Schedule Consultation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ml-2 transition-all duration-300 ${
                      isHovered ? "translate-x-1" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DevOpsExpertiseCard;
