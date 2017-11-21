const FEATURE_TYPES = [
  'TYPE_UNSPECIFIED',
  'FACE_DETECTION',
  'LANDMARK_DETECTION',
  'LOGO_DETECTION',
  'LABEL_DETECTION',
  'TEXT_DETECTION',
  'DOCUMENT_TEXT_DETECTION',
  'SAFE_SEARCH_DETECTION',
  'IMAGE_PROPERTIES',
  'CROP_HINTS',
  'WEB_DETECTION'
]
const KEY = process.env.REACT_APP_GOOGLE_API_KEY

if (!KEY) {
  console.warn('process.env.REACT_APP_GOOGLE_API_KEY is undefined')
}

export default function (image) {
  const content = image.split('base64,', 2)[1]
  return window.fetch(`https://vision.googleapis.com/v1/images:annotate?key=${KEY}`, {
    body: JSON.stringify({
      requests: [
        {
          features: FEATURE_TYPES
            .map(type => ({
              maxResults: 10,
              type
            })),
          image: {
            content
          }
        }
      ]
    }),
    method: 'post'
  })
    .then(response => response.json())
}
