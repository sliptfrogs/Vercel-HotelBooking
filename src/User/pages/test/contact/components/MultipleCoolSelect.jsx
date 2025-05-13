import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X, Search } from "lucide-react";

const ModernMultiSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(["aws", "gcp"]);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const categoryOptions = {
    "Cloud Platforms": [
      { value: "aws", label: "AWS" },
      { value: "gcp", label: "GCP" },
      { value: "azure", label: "Azure" },
      { value: "oci", label: "OCI" },
      { value: "do", label: "DigitalOcean" },
      { value: "linode", label: "Linode" },
      { value: "kubernetes", label: "Kubernetes" },
      { value: "openstack", label: "OpenStack" },
    ],
    "Infrastructure as Code": [
      { value: "terraform", label: "Terraform" },
      { value: "pulumi", label: "Pulumi" },
      { value: "ansible", label: "Ansible" },
      { value: "crossplane", label: "Crossplane" },
      { value: "cdk", label: "CDK" },
      { value: "cloudformation", label: "CloudFormation" },
      { value: "bicep", label: "Bicep" },
      { value: "saltstack", label: "SaltStack" },
    ],
    "Observability": [
      { value: "prometheus", label: "Prometheus" },
      { value: "grafana", label: "Grafana" },
      { value: "elk", label: "ELK" },
      { value: "opentelemetry", label: "OpenTelemetry" },
      { value: "datadog", label: "Datadog" },
      { value: "newrelic", label: "New Relic" },
      { value: "splunk", label: "Splunk" },
      { value: "loki", label: "Loki" },
    ]
  };

  // Flatten all options for search
  const allOptions = Object.values(categoryOptions).flat();

  const filteredOptions = allOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value) => {
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const removeOption = (e, value) => {
    e.stopPropagation();
    setSelectedOptions((prev) => prev.filter((item) => item !== value));
  };

  const clearAll = (e) => {
    e.stopPropagation();
    setSelectedOptions([]);
  };

  const handleKeyDown = (e, value) => {
    if (e.key === "Enter" || e.key === " ") {
      handleOptionClick(value);
      e.preventDefault();
    }
  };

  const handleSelectKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      toggleDropdown();
      e.preventDefault();
    } else if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  // Add CSS for hiding scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full max-w-md p-6 ">
      <div className="relative" ref={dropdownRef}>
        {/* Select Box */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyDown={handleSelectKeyDown}
          className="flex min-h-12 items-center justify-between rounded-xl bg-indigo-900/30 backdrop-blur-xl px-4 py-2 shadow-lg transition-all duration-200 border border-indigo-800/30 hover:border-indigo-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40 cursor-pointer"
        >
          <div className="flex flex-wrap gap-2">
            {selectedOptions.length === 0 && (
              <span className="text-indigo-300">Select tools</span>
            )}
            {selectedOptions.map((value) => {
              const option = allOptions.find(opt => opt.value === value);
              return option ? (
                <div
                  key={value}
                  className="flex items-center gap-1 rounded-lg bg-indigo-700/60 backdrop-blur-lg px-3 py-1 text-sm font-medium text-white transition-all hover:bg-indigo-600/70 group"
                >
                  {option.label}
                  <button
                    onClick={(e) => removeOption(e, value)}
                    className="ml-1 rounded-full p-1 text-indigo-200 group-hover:text-white transition-colors"
                    aria-label={`Remove ${option.label}`}
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : null;
            })}
          </div>
          <div className="flex items-center gap-2">
            {selectedOptions.length > 0 && (
              <button
                onClick={clearAll}
                className="mr-1 rounded-full p-1 text-indigo-300 transition-all hover:bg-indigo-800 hover:text-indigo-200"
                aria-label="Clear all selected options"
              >
                <X size={16} />
              </button>
            )}
            <ChevronDown
              size={16}
              className={`text-indigo-300 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute mt-2 z-50 w-full rounded-xl bg-indigo-900/40 backdrop-blur-xl shadow-xl border border-indigo-800/30 overflow-hidden transition-all duration-200 animate-in fade-in-0 zoom-in-95 origin-top">
            <div className="p-2 border-b border-indigo-800/20">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-2.5 text-indigo-300" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg bg-indigo-950/40 backdrop-blur-md py-2 pl-9 pr-3 text-sm text-indigo-100 placeholder-indigo-400 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
                />
              </div>
            </div>
            
            <div className="max-h-60 overflow-y-auto scrollbar-hide" role="listbox">
              {searchQuery ? (
                filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={selectedOptions.includes(option.value)}
                      tabIndex={0}
                      onClick={() => handleOptionClick(option.value)}
                      onKeyDown={(e) => handleKeyDown(e, option.value)}
                      className={`flex cursor-pointer items-center justify-between px-4 py-2.5 transition-colors ${
                        selectedOptions.includes(option.value)
                          ? "bg-blue-700/20 backdrop-blur-md text-blue-100 font-medium"
                          : "text-indigo-200 hover:bg-indigo-800/40 hover:backdrop-blur-md"
                      }`}
                    >
                      <span>{option.label}</span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ${
                        selectedOptions.includes(option.value) 
                          ? "bg-blue-600/80 backdrop-blur-md text-white" 
                          : "border border-indigo-600/70"
                      }`}>
                        {selectedOptions.includes(option.value) && (
                          <Check size={14} className="text-white" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-indigo-300 text-center">
                    No matching options found
                  </div>
                )
              ) : (
                Object.entries(categoryOptions).map(([category, options]) => (
                  <div key={category}>
                    <div className="px-4 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950/40 backdrop-blur-md">
                      {category}
                    </div>
                    {options.map((option) => (
                      <div
                        key={option.value}
                        role="option"
                        aria-selected={selectedOptions.includes(option.value)}
                        tabIndex={0}
                        onClick={() => handleOptionClick(option.value)}
                        onKeyDown={(e) => handleKeyDown(e, option.value)}
                        className={`flex cursor-pointer items-center justify-between px-4 py-2 transition-colors ${
                          selectedOptions.includes(option.value)
                            ? "bg-blue-700/20 backdrop-blur-md text-blue-100 font-medium"
                            : "text-indigo-200 hover:bg-indigo-800/40 hover:backdrop-blur-md"
                        }`}
                      >
                        <span>{option.label}</span>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200 ${
                          selectedOptions.includes(option.value) 
                            ? "bg-blue-600 text-white" 
                            : "border border-indigo-600"
                        }`}>
                          {selectedOptions.includes(option.value) && (
                            <Check size={14} className="text-white" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernMultiSelect;