import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaSave, 
  FaCloudDownloadAlt, 
  FaCloudUploadAlt, 
  FaTrash, 
  FaInfoCircle, 
  FaLightbulb,
  FaPencilAlt,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaQuestionCircle,
  FaBars,
  FaMagic,
  FaBookOpen,
  FaRocket,
  FaTimes,FaUserAstronaut,FaHandHoldingHeart, 
  FaTools,
  FaToolbox,
  FaHeart,
  FaMoneyBillWave,
  FaUsers,
  FaMobileAlt,
} from 'react-icons/fa';
import { FaSackDollar } from "react-icons/fa6";

import { NavBarbg } from '../components/navBar';

// Memoized input component to prevent unnecessary renders
const SectionInput = React.memo(({ 
  value, 
  onChange, 
  onKeyDown, 
  onFocus, 
  sectionKey, 
  index, 
  placeholder, 
  colorBorder, 
  colorFocusRing,
  onRemove,
  showRemoveButton,
  
}) => {
  return (
    <div className="flex group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(sectionKey, index, e.target.value)}
        onFocus={() => onFocus(sectionKey, index)}
        onKeyDown={(e) => onKeyDown(e, sectionKey, index)}
        data-section={sectionKey}
        // className={`w-full px-3 py-2 rounded-lg border ${colorBorder} focus:ring-2 ${colorFocusRing} focus:border-transparent`}
        className={`w-full px-3 py-2 rounded-lg border ${colorBorder}  focus:ring-2 ${colorFocusRing} focus:border-transparent focus:outline-4`}

        placeholder={placeholder}
      />


      {showRemoveButton && (
        <button
          onClick={() => onRemove(sectionKey, index)}
          className="ml-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      )}
    </div>
  );
});

// Memoized section block component
const SectionBlock = React.memo(({ 
  sectionKey, 
  color, 
  className, 
  sectionNames, 
  sectionIcons, 
  showTips, 
  sectionTips, 
  bmcData, 
  handleInputChange, 
  handleInputFocus, 
  handleKeyPress, 
  addInput, 
  removeInput, 
  isSectionEmpty 
}) => {
  return (
    <div className={`${className} p-4 rounded-xl ${color.light} border-2 ${isSectionEmpty(sectionKey) ? 'border-dashed' : 'border-solid'} ${color.border} relative group`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center">
          <span className={`mr-2 text-lg ${color.text}`} >{sectionIcons[sectionKey]}</span>
          {sectionNames[sectionKey]}
        </h3>
        <button
          onClick={() => addInput(sectionKey)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/50 rounded-full"
        >
          <FaPlus className={`${color.bg} text-white p-1 rounded-full`} />
        </button>
      </div>

      {showTips && (
        <div className="mb-3 text-sm text-gray-600 bg-white/80 p-2 rounded-lg">
          <FaLightbulb className="inline mr-1 text-yellow-500" />
          {sectionTips[sectionKey]}
        </div>
      )}

      <div className="space-y-2">
        {bmcData[sectionKey].map((item, index) => (
          <SectionInput
            key={`${sectionKey}-${index}`}
            value={item}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            onFocus={handleInputFocus}
            sectionKey={sectionKey}
            index={index}
            placeholder={`Type here... (${index + 1})`}
            colorBorder={color.border}
            colorFocusRing={color.ring}
            onRemove={removeInput}
            showRemoveButton={bmcData[sectionKey].length > 1}
          />
        ))}
      </div>
    </div>
  );
});

const BusinessModelCanvas = () => {
  const { t } = useTranslation();
  
  const [bmcData, setBmcData] = useState({
    keyPartners: [''],
    keyActivities: [''],
    keyResources: [''],
    valuePropositions: [''],
    customerRelationships: [''],
    channels: [''],
    customerSegments: [''],
    costStructure: [''],
    revenueStreams: ['']
  });
  const [canvasName, setCanvasName] = useState('My Business Model Canvas');
  const [showTips, setShowTips] = useState(false);
  const [savedCanvases, setSavedCanvases] = useState([]);
  const [editingName, setEditingName] = useState(false);
  const [showSavedCanvases, setShowSavedCanvases] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showHowTo, setShowHowTo] = useState(false);
  const canvasNameInputRef = useRef(null);
  
  // Track currently focused input
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Memoize section colors to prevent recreating on every render
  const sectionColors = useMemo(() => ({
    keyPartners: {bg: 'bg-indigo-500', hover: 'hover:bg-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-300',ring:'ring-indigo-300',text:'text-indigo-900'},
    keyActivities: {bg: 'bg-blue-500', hover: 'hover:bg-blue-600', light: 'bg-blue-50', border: 'border-blue-300',ring:'ring-blue-300',text:'text-blue-900'},
    keyResources: {bg: 'bg-teal-500', hover: 'hover:bg-teal-600', light: 'bg-teal-50', border: 'border-teal-300',ring:'ring-teal-300',text:'text-teal-900'},
    valuePropositions: {bg: 'bg-purple-500', hover: 'hover:bg-purple-600', light: 'bg-purple-50', border: 'border-purple-300',ring:'ring-purple-300',text:'text-purple-900'},
    customerRelationships: {bg: 'bg-pink-500', hover: 'hover:bg-pink-600', light: 'bg-pink-50', border: 'border-pink-300',ring:'ring-pink-300',text:'text-pink-900'},
    channels: {bg: 'bg-orange-500', hover: 'hover:bg-orange-600', light: 'bg-orange-50', border: 'border-orange-300',ring:'ring-orange-300',text:'text-orange-900'},
    customerSegments: {bg: 'bg-yellow-500', hover: 'hover:bg-yellow-600', light: 'bg-yellow-50', border: 'border-yellow-300',ring:'ring-yellow-300',text:'text-yellow-900'},
    costStructure: {bg: 'bg-gray-700', hover: 'hover:bg-gray-800', light: 'bg-gray-50', border: 'border-gray-300',ring:'ring-gray-300',text:'text-gray-900'},
    revenueStreams: {bg: 'bg-green-600', hover: 'hover:bg-green-700', light: 'bg-green-50', border: 'border-green-300',ring:'ring-green-300',text:'text-green-900'}
  }), []);
  
  // Memoize section names to prevent recreating on every render
  const sectionNames = useMemo(() => ({
    keyPartners: t('bmc.keyPartners', 'Key Partners'),
    keyActivities: t('bmc.keyActivities', 'Key Activities'),
    keyResources: t('bmc.keyResources', 'Key Resources'),
    valuePropositions: t('bmc.valuePropositions', 'Value Propositions'),
    customerRelationships: t('bmc.customerRelationships', 'Customer Relationships'),
    channels: t('bmc.channels', 'Channels'),
    customerSegments: t('bmc.customerSegments', 'Customer Segments'),
    costStructure: t('bmc.costStructure', 'Cost Structure'),
    revenueStreams: t('bmc.revenueStreams', 'Revenue Streams')
  }), [t]);

  // Memoize section icons
  const sectionIcons = useMemo(() => ({
    keyPartners: <FaUserAstronaut  />    ,
    keyActivities: <FaTools/>,
    keyResources: <FaToolbox/>,
    valuePropositions: <FaHandHoldingHeart />,
    customerRelationships: <FaHeart/>,
    channels: <FaMobileAlt/>,
    customerSegments:<FaUsers/>,
    costStructure: <FaMoneyBillWave/>,
    revenueStreams: <FaSackDollar />
 
  
  }), []);

  // Memoize section tips
  const sectionTips = useMemo(() => ({
    keyPartners: "Who are your key partners and suppliers? What resources are you acquiring from them?",
    keyActivities: "What key activities does your value proposition require? What activities are most important for your distribution channels?",
    keyResources: "What key resources does your value proposition require? What resources are important for your distribution channels?",
    valuePropositions: "What value do you deliver to the customer? Which customer problems are you helping to solve?",
    customerRelationships: "What type of relationship does each customer segment expect you to establish? How costly are they?",
    channels: "Through which channels do your customers want to be reached? Which channels work best?",
    customerSegments: "For whom are you creating value? Who are your most important customers?",
    costStructure: "What are the most important costs inherent in your business model? Which key resources are most expensive?",
    revenueStreams: "For what value are your customers willing to pay? What and how do they currently pay?"
  }), []);
  
  // Load saved canvases from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedCanvases');
    if (saved) {
      setSavedCanvases(JSON.parse(saved));
    }
    
    // Check if all sections have at least one input field
    const defaultData = { ...bmcData };
    let dataUpdated = false;
    
    Object.keys(defaultData).forEach(key => {
      if (!defaultData[key] || defaultData[key].length === 0) {
        defaultData[key] = [''];
        dataUpdated = true;
      }
    });
    
    if (dataUpdated) {
      setBmcData(defaultData);
    }
  }, []);

  // Effect to focus on canvas name input when editing
  useEffect(() => {
    if (editingName && canvasNameInputRef.current) {
      canvasNameInputRef.current.focus();
    }
  }, [editingName]);
  
  // Effect to restore focus after re-render
  useEffect(() => {
    if (focusedInput) {
      const { sectionKey, index } = focusedInput;
      const inputs = document.querySelectorAll(`[data-section="${sectionKey}"]`);
      if (inputs && inputs[index]) {
        inputs[index].focus();
        
        // Set cursor position to the end of the text
        const input = inputs[index];
        const length = input.value.length;
        input.setSelectionRange(length, length);
      }
    }
  }, [focusedInput]);

  // Function to check if a section is empty - memoized to prevent recalculation
  const isSectionEmpty = useCallback((sectionKey) => {
    return bmcData[sectionKey].every(item => item.trim() === '');
  }, [bmcData]);

  // Function to handle input changes with useCallback to prevent recreation on every render
  const handleInputChange = useCallback((sectionKey, index, value) => {
    // Use functional update to avoid capturing stale state
    setBmcData(prevData => {
      const updatedData = { ...prevData };
      updatedData[sectionKey] = [...prevData[sectionKey]];
      updatedData[sectionKey][index] = value;
      return updatedData;
    });
    
    // Set focus info
    setFocusedInput({ sectionKey, index });
  }, []);

  // Function to handle input focus
  const handleInputFocus = useCallback((sectionKey, index) => {
    setFocusedInput({ sectionKey, index });
  }, []);

  // Function to handle key presses in input fields
  const handleKeyPress = useCallback((e, sectionKey, index) => {
    // If Enter pressed and input not empty, add a new field
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      e.preventDefault();
      
      setBmcData(prevData => {
        const updatedItems = [...prevData[sectionKey]];
        updatedItems.splice(index + 1, 0, '');
        
        return {
          ...prevData,
          [sectionKey]: updatedItems
        };
      });
      
      // Set focus to new input after update
      setTimeout(() => {
        setFocusedInput({ sectionKey, index: index + 1 });
      }, 0);
    }
    
    // If Backspace pressed and input empty and not the only one, remove it
    else if (e.key === 'Backspace' && e.target.value === '') {
      // Check if there's more than one input
      if (bmcData[sectionKey].length > 1) {
        e.preventDefault();
        
        setBmcData(prevData => {
          const updatedItems = [...prevData[sectionKey]];
          updatedItems.splice(index, 1);
          
          return {
            ...prevData,
            [sectionKey]: updatedItems
          };
        });
        
        // Set focus to previous input after update
        setTimeout(() => {
          setFocusedInput({ sectionKey, index: Math.max(0, index - 1) });
        }, 0);
      }
    }
  }, [bmcData]);

  // Function to add a new input field to a section
  const addInput = (sectionKey, insertIndex = null) => {
    if(bmcData[sectionKey][bmcData[sectionKey].length-1]=='') return

    setBmcData(prevData => {
      const updatedItems = [...prevData[sectionKey]];
      
      if (insertIndex !== null) {
        updatedItems.splice(insertIndex, 0, '');
      } else {
        updatedItems.push('');
      }
      
      return {
        ...prevData,
        [sectionKey]: updatedItems
      };
    });
  }

  // Function to remove an input field from a section
  const removeInput = useCallback((sectionKey, index) => {
    setBmcData(prevData => {
      if (prevData[sectionKey].length <= 1) {
        // Don't remove if it's the last one, just clear it
        const updatedItems = [...prevData[sectionKey]];
        updatedItems[0] = '';
        return {
          ...prevData,
          [sectionKey]: updatedItems
        };
      }
      
      const updatedItems = [...prevData[sectionKey]];
      updatedItems.splice(index, 1);
      return {
        ...prevData,
        [sectionKey]: updatedItems
      };
    });
  }, []);

  // Function to show notification messages
  const showNotification = useCallback((message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' ? 
      '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>' :
      '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
    
    notification.className = `fixed top-20 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-500 z-50 flex items-center transform translate-x-0`;
    notification.innerHTML = `${icon}${message}`;
    document.body.appendChild(notification);
    
    // Animate in
    notification.style.transform = 'translateX(0)';
    
    // Animate out after delay
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  }, []);

  // Function to save canvas to localStorage
  const saveCanvas = useCallback(() => {
    // Filter out empty items before saving
    const filteredData = {};
    Object.keys(bmcData).forEach(key => {
      filteredData[key] = bmcData[key].filter(item => item.trim() !== '');
      // Ensure each section has at least one item (even if empty)
      if (filteredData[key].length === 0) {
        filteredData[key] = [''];
      }
    });
    
    const canvas = {
      id: Date.now(),
      name: canvasName,
      data: filteredData,
      lastModified: new Date().toISOString()
    };
    
    setSavedCanvases(prevCanvases => {
      const updated = [...prevCanvases, canvas];
      localStorage.setItem('savedCanvases', JSON.stringify(updated));
      return updated;
    });
    
    // Show animated notification
    showNotification(t('bmc.saveSuccess', 'Canvas saved successfully!'), 'success');
  }, [bmcData, canvasName, savedCanvases, showNotification, t]);

  // Function to load a saved canvas
  const loadCanvas = useCallback((canvas) => {
    setCanvasName(canvas.name);
    
    // Ensure all sections have at least one item
    const loadedData = { ...canvas.data };
    Object.keys(loadedData).forEach(key => {
      if (!loadedData[key] || loadedData[key].length === 0) {
        loadedData[key] = [''];
      }
    });
    
    setBmcData(loadedData);
    setShowSavedCanvases(false);
  }, []);

  // Function to delete a saved canvas
  const deleteCanvas = useCallback((id, e) => {
    e.stopPropagation(); // Prevent triggering the parent click event (loadCanvas)
    
    if (window.confirm(t('bmc.deleteConfirm', 'Are you sure you want to delete this canvas?'))) {
      setSavedCanvases(prevCanvases => {
        const updated = prevCanvases.filter(canvas => canvas.id !== id);
        localStorage.setItem('savedCanvases', JSON.stringify(updated));
        return updated;
      });
    }
  }, [t]);

  // Function to export canvas as JSON
  const exportCanvas = useCallback(() => {
    // Filter out empty items before exporting
    const filteredData = {};
    Object.keys(bmcData).forEach(key => {
      filteredData[key] = bmcData[key].filter(item => item.trim() !== '');
      if (filteredData[key].length === 0) {
        filteredData[key] = [''];
      }
    });
    
    const dataStr = JSON.stringify({ name: canvasName, data: filteredData }, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${canvasName.replace(/\s+/g, '_').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showNotification(t('bmc.exportSuccess', 'Canvas exported successfully!'), 'success');
  }, [bmcData, canvasName, showNotification, t]);

  // Function to import canvas from JSON file
  const importCanvas = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.name && imported.data) {
          setCanvasName(imported.name);
          
          // Ensure all sections have at least one item
          const importedData = { ...imported.data };
          Object.keys(importedData).forEach(key => {
            if (!importedData[key] || importedData[key].length === 0) {
              importedData[key] = [''];
            }
          });
          
          setBmcData(importedData);
          showNotification(t('bmc.importSuccess', 'Canvas imported successfully!'), 'success');
        } else {
          showNotification(t('bmc.importError', 'Invalid file format!'), 'error');
        }
      } catch (error) {
        showNotification(t('bmc.importError', 'Error importing file!'), 'error');
      }
    };
    reader.readAsText(file);
    
    // Reset the input value so the same file can be imported again
    event.target.value = '';
  }, [showNotification, t]);

  // Function to clear the current canvas
  const clearCanvas = useCallback(() => {
    if (window.confirm(t('bmc.clearConfirm', 'Are you sure you want to clear all fields?'))) {
      const emptyData = {};
      Object.keys(bmcData).forEach(key => {
        emptyData[key] = [''];
      });
      setBmcData(emptyData);
      setFocusedInput(null); // Clear focus when canvas is cleared
    }
  }, [bmcData, t]);

  // Handle canvas name input blur
  const handleCanvasNameBlur = useCallback(() => {
    setEditingName(false);
    if (canvasName.trim() === '') {
      setCanvasName('My Business Model Canvas');
    }
  }, [canvasName]);

  // Handle canvas name key press (Enter)
  const handleCanvasNameKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleCanvasNameBlur();
    }
  }, [handleCanvasNameBlur]);

  // Toggle UI sections
  const toggleSection = useCallback((section) => {
    if (section === 'about') {
      setShowAbout(prev => !prev);
      setShowHowTo(false);
      setShowSavedCanvases(false);
    } else if (section === 'howTo') {
      setShowHowTo(prev => !prev);
      setShowAbout(false);
      setShowSavedCanvases(false);
    } else if (section === 'savedCanvases') {
      setShowSavedCanvases(prev => !prev);
      setShowAbout(false);
      setShowHowTo(false);
    }
  }, []);

  // The SectionBlocks rendered for the BMC grid - memoized to prevent unnecessary re-renders
  const renderSectionBlocks = useMemo(() => {
    return {
      keyPartners: (
        <SectionBlock 
          sectionKey="keyPartners"
          className="min-h-64"
          color={sectionColors.keyPartners}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      keyActivities: (
        <SectionBlock 
          sectionKey="keyActivities"
          className="min-h-64"
          color={sectionColors.keyActivities}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      keyResources: (
        <SectionBlock 
          sectionKey="keyResources"
          className="min-h-64"
          color={sectionColors.keyResources}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      valuePropositions: (
        <SectionBlock 
          sectionKey="valuePropositions"
          className="h-full"
          color={sectionColors.valuePropositions}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      customerRelationships: (
        <SectionBlock 
          sectionKey="customerRelationships"
          className="min-h-64"
          color={sectionColors.customerRelationships}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      channels: (
        <SectionBlock 
          sectionKey="channels"
          className="min-h-64"
          color={sectionColors.channels}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      customerSegments: (
        <SectionBlock 
          sectionKey="customerSegments"
          className="min-h-64"
          color={sectionColors.customerSegments}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      costStructure: (
        <SectionBlock 
          sectionKey="costStructure"
          color={sectionColors.costStructure}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      ),
      revenueStreams: (
        <SectionBlock 
          sectionKey="revenueStreams"
          color={sectionColors.revenueStreams}
          sectionNames={sectionNames}
          sectionIcons={sectionIcons}
          showTips={showTips}
          sectionTips={sectionTips}
          bmcData={bmcData}
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleKeyPress={handleKeyPress}
          addInput={addInput}
          removeInput={removeInput}
          isSectionEmpty={isSectionEmpty}
        />
      )
    };
  }, [
    bmcData, 
    sectionColors, 
    sectionNames, 
    sectionIcons, 
    sectionTips, 
    showTips, 
    handleInputChange, 
    handleInputFocus, 
    handleKeyPress, 
    addInput, 
    removeInput, 
    isSectionEmpty
  ]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBarbg isLightBackground={false} />
      
      {/* Creative Header Section */}
      <div className="pt-20 pb-8 relative overflow-hidden">
        {/* Animated background with geometric shapes */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 opacity-90"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-300/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3          to-purple-300/20 rounded-full blur-lg"></div>
          <div className="absolute top-20 right-40 w-16 h-16 bg-yellow-300/10 rotate-45 blur-sm"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMGgzMHYzMEgweiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>
        
        <div className="container mx-auto pt-8 px-4 relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div className="flex items-center">
                      {/* <div className="mr-6 hidden md:block">
                        <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                          <span className="text-3xl">🧩</span>
                        </div>
                      </div> */}
                      
                      {/* <div className="relative group">
                        {editingName ? (
                          
                          <input
                            ref={canvasNameInputRef}
                            type="text"
                            value={canvasName}
                            onChange={(e) => {setCanvasName(e.target.value)}}
                            onBlur={handleCanvasNameBlur}
                            onKeyPress={handleCanvasNameKeyPress}
                            className="text-2xl md:text-3xl font-bold bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg px-4 py-2 outline-none w-full max-w-md focus:border-white transition-all"
                            placeholder={t('bmc.enterName', 'Enter canvas name')}
                            autoFocus
                          />


                        ) : (
                          <div 
                            onClick={() => setEditingName(true)} 
                            className="flex items-center cursor-pointer group relative"
                          >
                            <h1 className="text-2xl md:text-3xl bg-white/10 backdrop-blur-md font-bold px-4 py-2 rounded-lg text-white mr-3 border-2 border-transparent group-hover:border-white/30 transition-all">
                              {canvasName}
                              <span className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <FaPencilAlt className="text-xs text-white/70" />
                              </span>
                            </h1>
                          </div>
                        )}
                        <p className="mt-2 text-white text-opacity-90 font-light tracking-wide max-w-lg ml-1">
                          {t('bmc.subtitle', 'Define and visualize your business model in an interactive canvas')}
                        </p>
                      </div> */}

{/* <div className="relative group">
  {editingName ? (
    <div 
    className="flex items-center cursor-pointer group relative"
  >
    <input
      ref={canvasNameInputRef}
      type="text"
      value={canvasName}
      onChange={(e) => setCanvasName(e.target.value)}
      onBlur={handleCanvasNameBlur}
      onKeyPress={handleCanvasNameKeyPress}
      className="text-2xl md:text-3xl font-bold bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg px-4 py-2 outline-none w-full max-w-md focus:border-white transition-all placeholder-white/50"
      placeholder={t('bmc.enterName', 'Enter canvas name')}
      autoFocus
    />
        </div>

  ) : (
    <div 
      onClick={() => setEditingName(true)} 
      className="flex items-center cursor-pointer group relative"
    >
      <h1 className="text-2xl md:text-3xl bg-white/10 backdrop-blur-md font-bold px-4 py-2 rounded-lg text-white mr-3 border-2 border-transparent group-hover:border-white/30 transition-all relative pr-12">
        {canvasName}
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <FaPencilAlt className="text-sm text-white/70 bg-white/10 p-1 rounded-full border border-white/20 hover:bg-white/20" />
        </span>
      </h1>
    </div>
  )}
  {/* <p className="mt-2 text-white/80 font-light tracking-wide max-w-lg ml-1 bg-black/10 backdrop-blur-sm px-3 py-1 rounded-md inline-block">
    {t('bmc.subtitle', 'Define and visualize your business model in an interactive canvas')}
  </p> 
</div> */}

<div className="relative group">
  {editingName ? (
    <div className="flex items-center cursor-pointer group relative">
      <div className="bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:border-white/40 transition-all shadow-lg">
        <div className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-3">
          <input
            ref={canvasNameInputRef}
            type="text"
            value={canvasName}
            onChange={(e) => setCanvasName(e.target.value)}
            onBlur={handleCanvasNameBlur}
            onKeyPress={handleCanvasNameKeyPress}
            className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 w-full"
            placeholder={t('bmc.enterName', 'Enter canvas name')}
            autoFocus
            maxLength={25}
            minLength={5}
          />
          <span className="bg-white/10 p-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
            <FaPencilAlt className="text-sm text-white/80" />
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div 
      onClick={() => setEditingName(true)} 
      className="flex items-center cursor-pointer group relative"
    >
      <div className="bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-md rounded-xl p-4 border-2 border-white/20 hover:border-white/40 transition-all shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-3">
          <span>{canvasName}</span>
          <span className="bg-white/10 p-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
            <FaPencilAlt className="text-sm text-white/80" />
          </span>
        </h1>
      </div>
    </div>
  )}
  <p className="mt-3 text-white/80 font-light tracking-wide max-w-lg ml-1 text-sm backdrop-blur-sm bg-black/10 px-3 py-1.5 rounded-lg inline-block">
    {t('bmc.subtitle', 'Define and visualize your business model in an interactive canvas')}
  </p>
</div>
                    </div>
                    
                    <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
                      <button
                        onClick={() => setShowTips(!showTips)}
                        className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/20 text-white"
                      >
                        <FaLightbulb className="mr-2" />
                        {showTips ? t('bmc.hideTips', 'Hide Tips') : t('bmc.showTips', 'Show Tips')}
                      </button>
                      
                      <button
                        onClick={saveCanvas}
                        className="flex items-center px-4 py-2 bg-green-500/80 hover:bg-green-600/80 rounded-lg transition-colors backdrop-blur-sm text-white"
                      >
                        <FaSave className="mr-2" />
                        {t('bmc.save', 'Save')}
                      </button>
                      
                      <button
                        onClick={exportCanvas}
                        className="flex items-center px-4 py-2 bg-purple-500/80 hover:bg-purple-600/80 rounded-lg transition-colors backdrop-blur-sm text-white"
                      >
                        <FaCloudDownloadAlt className="mr-2" />
                        {t('bmc.export', 'Export')}
                      </button>
                      
                      <label className="flex items-center px-4 py-2 bg-orange-500/80 hover:bg-orange-600/80 rounded-lg transition-colors backdrop-blur-sm cursor-pointer text-white">
                        <FaCloudUploadAlt className="mr-2" />
                        {t('bmc.import', 'Import')}
                        <input
                          type="file"
                          accept=".json"
                          onChange={importCanvas}
                          className="hidden"
                        />
                      </label>
                      
                      <button
                        onClick={clearCanvas}
                        className="flex items-center px-4 py-2 bg-red-500/80 hover:bg-red-600/80 rounded-lg transition-colors backdrop-blur-sm text-white"
                      >
                        <FaTrash className="mr-2" />
                        {t('bmc.clear', 'Clear')}
                      </button>
                    </div>
                  </div>
                  
                  {/* Navigation pills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button 
                      onClick={() => {
                        setShowAbout(!showAbout);
                        setShowHowTo(false);
                        setShowSavedCanvases(false);
                      }}
                      className={`py-2 px-5 rounded-full transition-all text-sm font-medium backdrop-blur-sm flex items-center 
                        ${showAbout ? 'bg-white text-indigo-600 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <FaInfoCircle className="mr-2" />
                      {t('bmc.about', 'About BMC')}
                    </button>
                    
                    <button 
                      onClick={() => {
                        setShowHowTo(!showHowTo);
                        setShowAbout(false);
                        setShowSavedCanvases(false);
                      }}
                      className={`py-2 px-5 rounded-full transition-all text-sm font-medium backdrop-blur-sm flex items-center 
                        ${showHowTo ? 'bg-white text-indigo-600 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      <FaQuestionCircle className="mr-2" />
                      {t('bmc.howTo', 'How to Use')}
                    </button>
                    
                    {savedCanvases.length > 0 && (
                      <button 
                        onClick={() => {
                          setShowSavedCanvases(!showSavedCanvases);
                          setShowAbout(false);
                          setShowHowTo(false);
                        }}
                        className={`py-2 px-5 rounded-full transition-all text-sm font-medium backdrop-blur-sm flex items-center 
                          ${showSavedCanvases ? 'bg-white text-indigo-600 shadow-md' : 'bg-white/10 text-white hover:bg-white/20'}`}
                      >
                        <FaBookOpen className="mr-2" />
                        {t('bmc.myCanvases', 'My Canvases')} ({savedCanvases.length})
                      </button>
                    )}
                  </div>
                </div>
      </div>

      {/* About BMC Section */}
      {showAbout && (
                  <div className="container mx-auto px-4 py-8 bg-white rounded-xl shadow-lg mb-8 backdrop-blur-xl border border-indigo-100 bg-opacity-95">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center">
                          <span className="bg-indigo-100 rounded-full p-2 mr-3">
                            <FaInfoCircle className="text-indigo-600" />
                          </span>
                          {t('bmc.aboutTitle', 'About the Business Model Canvas')}
                        </h2>
                        
                        <div className="space-y-4 text-gray-700">
                          <p className="leading-relaxed">
                            The Business Model Canvas (BMC) is a strategic management tool that helps you visualize, design, and pivot your business model. Created by Alexander Osterwalder, it offers a holistic view of your business through nine essential building blocks.
                          </p>
                          
                          <div className="flex flex-wrap gap-4 mt-6">
                            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100 flex-1 min-w-[240px]">
                              <h3 className="font-bold text-indigo-700 mb-2">Key Benefits</h3>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Provides a comprehensive overview of your business</li>
                                <li>Facilitates innovation and strategic discussions</li>
                                <li>Helps identify gaps and opportunities</li>
                                <li>Promotes customer-centric thinking</li>
                              </ul>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 rounded-lg border border-blue-100 flex-1 min-w-[240px]">
                              <h3 className="font-bold text-blue-700 mb-2">Perfect For</h3>
                              <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Startups defining their business model</li>
                                <li>Existing businesses exploring new opportunities</li>
                                <li>Consultants working with clients</li>
                                <li>Entrepreneurs testing new ideas</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-1/3 bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-6 rounded-xl flex flex-col justify-center">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
                          <div className="text-5xl mb-4 text-center">💡</div>
                          <h3 className="text-xl font-bold mb-2 text-center">Did You Know?</h3>
                          <p className="text-white/90 text-sm leading-relaxed">
                            The Business Model Canvas has become one of the most popular strategic tools globally, used by millions of businesses from startups to Fortune 500 companies. It's taught in top business schools worldwide and has revolutionized how we think about business planning.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                

      {/* How to Use Section */}
        {showHowTo && (
             <div className="container mx-auto px-4 py-8 bg-white rounded-2xl shadow-lg mb-8 border border-gray-100">
               <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                 <FaRocket className="mr-2 text-purple-500" />
                 {t('bmc.howToTitle', 'How to Use This Canvas')}
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                   <div className="flex items-center mb-4">
                     <div className="bg-purple-100 p-3 rounded-lg mr-4">
                       <FaMagic className="text-purple-500 text-xl" />
                     </div>
                     <h3 className="text-lg font-semibold">Getting Started</h3>
                   </div>
                   <ul className="space-y-3 text-gray-700 pl-2">
                     <li className="flex items-center">
                       <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">1</span>
                       Click any section to start editing
                     </li>
                     <li className="flex items-center">
                       <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">2</span>
                       Press Enter to create new items
                     </li>
                     <li className="flex items-center">
                       <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">3</span>
                       Use Backspace to remove empty items
                     </li>
                   </ul>
                 </div>
           
                 <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                   <div className="flex items-center mb-4">
                     <div className="bg-blue-100 p-3 rounded-lg mr-4">
                       <FaLightbulb className="text-blue-500 text-xl" ></FaLightbulb>
                     </div>
                     <h3 className="text-lg font-semibold">Pro Tips</h3>
                   </div>
                   <ul className="space-y-3 text-gray-700 pl-2">
                     <li className="flex">
                       <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">💡</span>
                       Start with Customer Segments and Value Propositions
                     </li>
                     <li className="flex">
                       <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">💡</span>
                       Use different colors to visually organize ideas
                     </li>
                     <li className="flex">
                       <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">💡</span>
                       Regularly save your progress
                     </li>
                   </ul>
                 </div>
               </div>
             </div>
           )}

      {/* BMC Grid */}
      <div className="container mx-auto p-8 px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bmc-grid">
          {/* Left Column */}
          <div className="space-y-4">
            {renderSectionBlocks.keyPartners}
            {renderSectionBlocks.keyActivities}
            {renderSectionBlocks.keyResources}
          </div>

          {/* Center Column */}
          <div className="space-y-4">
            {renderSectionBlocks.valuePropositions}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {renderSectionBlocks.customerRelationships}
            {renderSectionBlocks.channels}
            {renderSectionBlocks.customerSegments}
          </div>

          {/* Bottom Row */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {renderSectionBlocks.costStructure}
            {renderSectionBlocks.revenueStreams}
          </div>
        </div>
      </div>

      {/* Saved Canvases Modal */}
     {showSavedCanvases && (
            <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-xl font-bold flex items-center">
                    <FaBookOpen className="mr-2 text-purple-500" />
                    {t('bmc.savedCanvases', 'Your Saved Canvases')}
                  </h3>
                  <button 
                    onClick={() => setShowSavedCanvases(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4 overflow-y-auto">
                  {savedCanvases.map((canvas) => (
                    <div key={canvas.id} className="group relative bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-purple-200 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-800">{canvas.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Last modified: {new Date(canvas.lastModified).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => loadCanvas(canvas)}
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center"
                          >
                            <FaCloudDownloadAlt className="mr-2" />
                            Load
                          </button>
                          <button
                            onClick={(e) => deleteCanvas(canvas.id, e)}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center"
                          >
                            <FaTrash className="mr-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
    </div>
  );
};

export default BusinessModelCanvas;