import { useRef, useState, useEffect } from 'react'
import { ImageUp } from 'lucide-react'
import styles from './MultipleImageUpload.module.css'

const MAX_FILES = 5

export default function MultipleImageUpload() {
	const [files, setFiles] = useState([]);

	const inputRef = useRef(null)

	  useEffect(() => {
    return () => {
      files.forEach(({ preview }) => URL.revokeObjectURL(preview));
    };
  }, [files]);


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    if (files.length + selectedFiles.length > MAX_FILES) {
      alert(`You can only upload up to ${MAX_FILES} images. ${selectedFiles.length + files.length - MAX_FILES} files were ignored.`);
      // Only take the files that fit within the limit
      const remainingSlots = MAX_FILES - files.length;
      if (remainingSlots <= 0) {
        event.target.value = ''; // Reset input if full
        return;
      }
      // Slice the new files to fit
      const filesToAdd = selectedFiles.slice(0, remainingSlots);
      addFiles(filesToAdd);
    } else {
      addFiles(selectedFiles);
    }

    // Reset input value
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const addFiles = (newFiles) => {
    const processedFiles = newFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `${file.name}-${Date.now()}-${Math.random()}`
    }));
    setFiles(prev => [...prev, ...processedFiles]);
  };

	return (
		<div className={styles.Wrapper}>
			<input type="file" name="images" accept="image/*" multiple ref={inputRef} onChange={handleFileChange}/>
			<div className={styles.Display}>
				{files.map(({ id, preview }) => (
					<div key={id} className={styles.AddImages}>
						<img key={id} src={preview} alt="preview"/>
					</div>
				))}
				{files.length <= 4 && (

					<div className={styles.AddImages} onClick={() => inputRef?.current.click()}>
						<ImageUp size={35} strokeWidth={1}/>
					</div>
				)}
			</div>
		</div>
	)
}