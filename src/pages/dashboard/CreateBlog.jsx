import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiType, FiFileText, FiSend, FiX, FiCheckCircle } from "react-icons/fi";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); 
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    // Prepare data for backend (usually FormData for files)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);

    console.log("Submitting File:", imageFile?.name);
    
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      alert("Blog posted successfully with image file!");
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-120px)] rounded-xl  text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-primary mb-2">Create Blog</h1>
          <p className="text-gray-400">Upload an image and share your thoughts.</p>
        </header>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 p-8 rounded-2xl border border-white/5 shadow-2xl text-neutral-content"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FiType className="text-primary" /> Title
              </label>
              <input
                type="text"
                required
                placeholder="Add Title"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Styled Image Upload Zone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FiUploadCloud className="text-primary" /> Cover Image
              </label>
              
              {!imagePreview ? (
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="h-44 border-2 border-dashed border-white/10 group-hover:border-primary/50 rounded-xl flex flex-col items-center justify-center bg-black transition-all">
                    <FiUploadCloud className="text-3xl group-hover:text-primary mb-2" />
                    <p className=" group-hover:text-gray-300 text-sm">Click or drag to upload image</p>
                    <p className="text-xs text-gray-600 mt-1">PNG, JPG or WEBP (Max 5MB)</p>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-white/10 h-64 bg-black">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <button 
                      type="button"
                      onClick={removeImage}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
                    >
                      <FiX /> Remove & Change
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs text-green-400">
                    <FiCheckCircle /> Ready to upload
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <FiFileText className="text-primary" /> Description
              </label>
              <textarea
                required
                rows="6"
                placeholder="Write Blog"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all text-white resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-lg ${
                isUploading 
                ? "bg-gray-700 cursor-not-allowed" 
                : "bg-primary hover:bg-primary/90 text-white shadow-primary/20"
              }`}
            >
              {isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Posting...
                </>
              ) : (
                <>
                  <FiSend /> Post Blog
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateBlog;