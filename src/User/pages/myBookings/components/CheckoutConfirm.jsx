import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";

const CheckoutConfirm = ({ handleFinish }) => {
  const [isProcessing, setIsProcessing] = useState(true); // Should initialize as true

  useEffect(() => {
    const processingTimer = setTimeout(() => {
      setIsProcessing(false);
      handleFinish();
    }, 2000); // Increased to more realistic 2 seconds

    return () => clearTimeout(processingTimer);
  }, [handleFinish]); // Added handleFinish to dependencies

  return (
    <div className="flex flex-col items-center justify-start md:p-6">
      <div className="w-full max-w-md mx-auto rounded-lg shadow-sm p-6 md:p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="mb-5 flex flex-col items-center justify-center gap-2">
            <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800">
              {isProcessing && (
                <LoaderCircle className="animate-spin h-5 w-5" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {isProcessing ? "Processing payment..." : "Payment complete!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirm;