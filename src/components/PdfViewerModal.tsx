import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Download, ExternalLink, FileText } from "lucide-react";

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function PdfViewerModal({ isOpen, onClose, pdfUrl, title }: PdfViewerModalProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && pdfUrl) {
      setLoading(true);
      setError(null);
      
      // Fetch the PDF as a blob to bypass some iframe/plugin restrictions
      fetch(pdfUrl)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load PDF");
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setBlobUrl(url);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading PDF:", err);
          setError("Could not load the PDF viewer. Please use the download or open button.");
          setLoading(false);
        });
    }

    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        setBlobUrl(null);
      }
    };
  }, [isOpen, pdfUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-dark rounded-2xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col border border-gold/20 shadow-2xl"
          >
            <div className="p-4 border-b border-gold/10 flex justify-between items-center bg-charcoal">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <FileText className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-cream leading-none">{title}</h3>
                  <p className="text-gold/50 text-xs mt-1">Rules & Regulations</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gold hover:text-cream transition bg-gold/5 hover:bg-gold/10 rounded-lg flex items-center space-x-2 px-3"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-xs font-bold hidden sm:inline">Open New Tab</span>
                </a>
                <a
                  href={pdfUrl}
                  download
                  className="p-2 text-gold hover:text-cream transition bg-gold/5 hover:bg-gold/10 rounded-lg"
                  title="Download PDF"
                >
                  <Download className="w-6 h-6" />
                </a>
                <button
                  onClick={onClose}
                  className="p-2 text-gold hover:text-cream transition bg-gold/5 hover:bg-gold/10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-grow bg-charcoal relative">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gold space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                  <p className="text-sm font-medium">Loading PDF Viewer...</p>
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 space-y-6">
                  <div className="p-4 bg-red-500/10 rounded-full">
                    <FileText className="w-16 h-16 text-red-500/50" />
                  </div>
                  <div className="max-w-md">
                    <h4 className="text-xl font-bold text-cream mb-2">Viewer Blocked</h4>
                    <p className="text-gold/60 mb-6">{error}</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gold text-white px-6 py-3 rounded-xl font-bold hover:bg-gold/80 transition"
                      >
                        Open in New Tab
                      </a>
                      <a
                        href={pdfUrl}
                        download
                        className="bg-cream text-charcoal px-6 py-3 rounded-xl font-bold hover:bg-white transition"
                      >
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              ) : blobUrl ? (
                <object
                  data={`${blobUrl}#view=FitH&toolbar=1`}
                  type="application/pdf"
                  className="w-full h-full border-none"
                >
                  <iframe
                    src={`${blobUrl}#view=FitH&toolbar=1`}
                    className="w-full h-full border-none"
                    title={title}
                  />
                </object>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gold/50 space-y-4">
                  <FileText className="w-16 h-16 opacity-20" />
                  <p>PDF content not available</p>
                </div>
              )}
              
              {/* Overlay hint */}
              {!loading && !error && blobUrl && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                  <p className="text-[10px] text-gold/40 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-gold/10">
                    If the viewer is blank, use the "Open New Tab" button above
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
