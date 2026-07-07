import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Check } from 'lucide-react';
import { getCroppedImgFile } from '../../utils/cropImage';

const ImageCropperModal = ({ isOpen, imageSrc, onClose, onCropComplete, isUploading }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropCompleteHandler = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    try {
      const croppedFile = await getCroppedImgFile(imageSrc, croppedAreaPixels, 'cropped-product.jpg');
      onCropComplete(croppedFile);
    } catch (e) {
      console.error(e);
      alert('Failed to crop image.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-outfit"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col"
            style={{ border: '1px solid rgba(26,65,115,0.1)' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#1a4173]">Crop Image</h3>
              <button 
                onClick={onClose}
                disabled={isUploading}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cropper Container */}
            <div className="relative w-full bg-gray-100" style={{ height: '65vh', minHeight: '400px' }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={3 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropCompleteHandler}
                onZoomChange={setZoom}
                objectFit="contain"
              />
            </div>

            {/* Controls & Actions */}
            <div className="p-5 bg-white space-y-6">
              
              {/* Zoom Control */}
              <div className="flex items-center gap-4 px-2">
                <ZoomOut size={16} className="text-gray-400 shrink-0" />
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#1a4173]"
                />
                <ZoomIn size={16} className="text-gray-400 shrink-0" />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 border-t border-gray-50">
                <button
                  onClick={onClose}
                  disabled={isUploading}
                  className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isUploading}
                  className="flex-1 py-3 px-4 text-xs font-bold uppercase tracking-widest rounded-xl transition-all text-white flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ background: '#1a4173' }}
                >
                  {isUploading ? (
                    <span className="animate-pulse">Uploading...</span>
                  ) : (
                    <>
                      <Check size={14} /> Crop & Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageCropperModal;
