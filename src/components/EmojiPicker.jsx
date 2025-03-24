import React from 'react';
import EmojiPicker from 'emoji-picker-react';

const CustomEmojiPicker = ({ onSelect }) => {
  return (
    <div className="emoji-picker-container"
    
    >
      <EmojiPicker
        onEmojiClick={(emojiObject) => onSelect(emojiObject.emoji)}
        theme="light"
        skinTonesDisabled
        searchDisabled={false}
        height={400}
        width="100%"
        previewConfig={{
          showPreview: false
        }}
        
      />
    </div>
  );
};

export default CustomEmojiPicker;