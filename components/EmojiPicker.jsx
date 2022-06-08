import { useEffect, useRef } from 'react'
import data from '@emoji-mart/data'

function EmojiPicker(props = {}) {
  const ref = useRef()

  useEffect(() => {
    import('emoji-mart').then((EmojiMart) => {
      new EmojiMart.Picker({ ...props, data, ref })
    })
  }, [])

  return <div ref={ref}></div>
}

export default EmojiPicker