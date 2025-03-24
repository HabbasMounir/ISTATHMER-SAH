import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaSave, 
  FaCloudDownloadAlt, 
  FaCloudUploadAlt, 
  FaTrash, 
  FaLightbulb,
  FaPencilAlt,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
  FaRegLightbulb,
  FaMagic,
  FaBrain,
  FaBalanceScale,
  FaChartLine,
  FaShieldAlt,
  FaRegStar,
  FaRegCommentDots
} from 'react-icons/fa';
import { NavBarbg } from '../components/navBar';
import { EmojiPicker } from '../components/emojiPicker';

const SWOTItem = React.memo(({ 
  value, 
  onChange,
  onKeyDown,
  onFocus,
  onRemove,
  showRemove,
  colorClass,
  onAddEmoji,
  index
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  return (
    <div className="group relative">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`shrink-0 p-1.5 rounded-lg ${colorClass} bg-opacity-20 hover:bg-opacity-30 transition-all`}
        >
          {value.emoji || '✨'}
        </button>
        
        <input
          value={value.text}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          className={`flex-1 p-2 rounded-lg border-2 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-4 ${colorClass} focus:border-transparent`}
          placeholder="Enter strategic element..."
        />

        {showRemove && (
          <button
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-red-500 hover:text-red-600"
          >
            <FaTrash className="w-4 h-4" />
          </button>
        )}
      </div>

      {showEmojiPicker && (
        <div className="absolute left-0 z-10 mt-2">
          <EmojiPicker 
            onSelect={(emoji) => {
              onAddEmoji(emoji);
              setShowEmojiPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
});

const SWOTQuadrant = React.memo(({ 
  title, 
  items, 
  colorClass,
  icon: Icon,
  onAddItem,
  onChangeItem,
  onRemoveItem,
  tips,
  showTips,
  onAddEmoji,
  onFocusItem
}) => {
  return (
    <div className={`p-6 rounded-3xl shadow-lg ${colorClass} bg-opacity-10 backdrop-blur-sm border-2 ${colorClass} border-opacity-30`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <Icon className={`text-2xl ${colorClass}`} />
          {title}
        </h3>
        <button
          onClick={onAddItem}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <FaPlus className={`text-lg ${colorClass}`} />
        </button>
      </div>

      {showTips && (
        <div className="mb-4 p-3 rounded-xl bg-white/80 text-sm italic">
          <FaLightbulb className="inline mr-2 text-yellow-500" />
          {tips}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <SWOTItem
            key={index}
            value={item}
            onChange={(val) => onChangeItem(index, val)}
            onFocus={() => onFocusItem(index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            onRemove={() => onRemoveItem(index)}
            showRemove={items.length > 1}
            colorClass={colorClass}
            onAddEmoji={(emoji) => onAddEmoji(index, emoji)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
});

const TOWSMatrix = ({ swotData }) => {
  const generateStrategies = useCallback(() => {
    const strategies = {
      so: [],
      st: [],
      wo: [],
      wt: []
    };

    // Generate SO Strategies
    swotData.strengths.forEach(s => {
      swotData.opportunities.forEach(o => {
        strategies.so.push(`Leverage ${s.text} to capitalize on ${o.text}`);
      });
    });

    // Generate ST Strategies
    swotData.strengths.forEach(s => {
      swotData.threats.forEach(t => {
        strategies.st.push(`Use ${s.text} to counter ${t.text}`);
      });
    });

    // Generate WO Strategies
    swotData.weaknesses.forEach(w => {
      swotData.opportunities.forEach(o => {
        strategies.wo.push(`Overcome ${w.text} to take advantage of ${o.text}`);
      });
    });

    // Generate WT Strategies
    swotData.weaknesses.forEach(w => {
      swotData.threats.forEach(t => {
        strategies.wt.push(`Mitigate ${w.text} and ${t.text} through defensive measures`);
      });
    });

    return strategies;
  }, [swotData]);

  const strategies = generateStrategies();

  return (
    <div className="mt-12 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-lg border-2 border-purple-100">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-purple-800">
        <FaMagic className="text-3xl" />
        Strategic Recommendations (TOWS Matrix)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-green-50 rounded-xl">
          <h4 className="font-bold text-green-800 mb-3">SO Strategies</h4>
          <ul className="list-disc pl-5 space-y-2">
            {strategies.so.slice(0, 3).map((s, i) => (
              <li key={i} className="text-green-700">{s}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 rounded-xl">
          <h4 className="font-bold text-yellow-800 mb-3">ST Strategies</h4>
          <ul className="list-disc pl-5 space-y-2">
            {strategies.st.slice(0, 3).map((s, i) => (
              <li key={i} className="text-yellow-700">{s}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl">
          <h4 className="font-bold text-blue-800 mb-3">WO Strategies</h4>
          <ul className="list-disc pl-5 space-y-2">
            {strategies.wo.slice(0, 3).map((s, i) => (
              <li key={i} className="text-blue-700">{s}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-red-50 rounded-xl">
          <h4 className="font-bold text-red-800 mb-3">WT Strategies</h4>
          <ul className="list-disc pl-5 space-y-2">
            {strategies.wt.slice(0, 3).map((s, i) => (
              <li key={i} className="text-red-700">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SWOTAnalysis = () => {
  const { t } = useTranslation();
  
  const [swotData, setSwotData] = useState({
    strengths: [{ text: '', emoji: '💪' }],
    weaknesses: [{ text: '', emoji: '⚠️' }],
    opportunities: [{ text: '', emoji: '🚀' }],
    threats: [{ text: '', emoji: '🛡️' }]
  });
  
  const [canvasName, setCanvasName] = useState('Strategic Analysis Canvas');
  const [showTips, setShowTips] = useState(true);
  const [showTOWS, setShowTOWS] = useState(true);
  const [savedCanvases, setSavedCanvases] = useState([]);

  // ... (similar state and logic for save/load/export/import as BMC but for SWOT data)

  const handleAddItem = useCallback((quadrant) => {
    setSwotData(prev => ({
      ...prev,
      [quadrant]: [...prev[quadrant], { text: '', emoji: '✨' }]
    }));
  }, []);

  const handleChangeItem = useCallback((quadrant, index, value) => {
    setSwotData(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].map((item, i) => 
        i === index ? { ...item, text: value } : item
      )
    }));
  }, []);

  const handleAddEmoji = useCallback((quadrant, index, emoji) => {
    setSwotData(prev => ({
      ...prev,
      [quadrant]: prev[quadrant].map((item, i) => 
        i === index ? { ...item, emoji } : item
      )
    }));
  }, []);
  const handleFocusItem = useCallback((quadrant, index) => {
    // Implement any focus-related logic you need
    console.log(`Focused ${quadrant} item ${index}`);
    // If you need to track focused item state:
    setFocusedInput({ quadrant, index });
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <NavBarbg isLightBackground={true} />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header and Controls */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 swot-grid">
            <SWOTQuadrant
              title="Strengths"
              items={swotData.strengths}
              colorClass="text-green-600"
              icon={FaRegStar}
              tips="Internal advantages and core competencies"
              showTips={showTips}
              onAddItem={() => handleAddItem('strengths')}
              onChangeItem={(i, v) => handleChangeItem('strengths', i, v)}
              onRemoveItem={(i) => handleRemoveItem('strengths', i)}
              onAddEmoji={(i, e) => handleAddEmoji('strengths', i, e)}
              onFocusItem={(index) => handleFocusItem('strengths', index)}

            />

            <SWOTQuadrant
              title="Weaknesses"
              items={swotData.weaknesses}
              colorClass="text-red-600"
              icon={FaBalanceScale}
              tips="Internal limitations and areas for improvement"
              showTips={showTips}
              onAddItem={() => handleAddItem('weaknesses')}
              onChangeItem={(i, v) => handleChangeItem('weaknesses', i, v)}
              onRemoveItem={(i) => handleRemoveItem('weaknesses', i)}
              onAddEmoji={(i, e) => handleAddEmoji('weaknesses', i, e)}
              onFocusItem={(index) => handleFocusItem('weaknesses', index)}

            />

            <SWOTQuadrant
              title="Opportunities"
              items={swotData.opportunities}
              colorClass="text-blue-600"
              icon={FaChartLine}
              tips="External possibilities for growth and development"
              showTips={showTips}
              onAddItem={() => handleAddItem('opportunities')}
              onChangeItem={(i, v) => handleChangeItem('opportunities', i, v)}
              onRemoveItem={(i) => handleRemoveItem('opportunities', i)}
              onAddEmoji={(i, e) => handleAddEmoji('opportunities', i, e)}
              onFocusItem={(index) => handleFocusItem('weaknesses', index)}

            />

            <SWOTQuadrant
              title="Threats"
              items={swotData.threats}
              colorClass="text-orange-600"
              icon={FaShieldAlt}
              tips="External challenges and potential risks"
              showTips={showTips}
              onAddItem={() => handleAddItem('threats')}
              onChangeItem={(i, v) => handleChangeItem('threats', i, v)}
              onRemoveItem={(i) => handleRemoveItem('threats', i)}
              onAddEmoji={(i, e) => handleAddEmoji('threats', i, e)}
              onFocusItem={(index) => handleFocusItem('weaknesses', index)}

            />
          </div>

          {showTOWS && <TOWSMatrix swotData={swotData} />}

          {/* Footer Controls */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button className="p-3 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <FaRegCommentDots className="text-2xl text-purple-600" />
            </button>
            <button className="p-3 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <FaBrain className="text-2xl text-blue-600" />
            </button>
            <button className="p-3 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <FaMagic className="text-2xl text-green-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWOTAnalysis;