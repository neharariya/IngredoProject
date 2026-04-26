import Tesseract from 'tesseract.js'

export async function extractTextFromImage(file: File): Promise<string> {
  try {
    const result = await Tesseract.recognize(
      file,
      'eng',
      // {
      //   logger: m => console.log(m)
      // }
    )
    
    return result.data.text.trim();
  } catch (error) {
    console.error('OCR Error:', error)
    throw new Error('Failed to extract text from image')
  }
}

export function validateImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  if (!validTypes.includes(file.type)) {
    throw new Error('Please upload a valid image file (JPEG, PNG, or WebP)')
  }
  
  if (file.size > maxSize) {
    throw new Error('Image file size must be less than 10MB')
  }
  
  return true
} 