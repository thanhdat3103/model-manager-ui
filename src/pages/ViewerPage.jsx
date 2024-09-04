import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function ViewerPage() {
    const [activeTab, setActiveTab] = useState('clipping');
    const [activeRightTab, setActiveRightTab] = useState(null);
    const [isRightContentVisible, setIsRightContentVisible] = useState(false);
    const [isLeftContentVisible, setIsLeftContentVisible] = useState(true);

    const handleLeftTabClick = (tab) => {
        if (activeTab === tab) {
            setIsLeftContentVisible(!isLeftContentVisible);
            setActiveTab(null);
        } else {
            setActiveTab(tab);
            setIsLeftContentVisible(true);
        }
    };

    const handleRightTabClick = (tab) => {
        setIsRightContentVisible(!isRightContentVisible);
        if (activeRightTab === tab) {
            setActiveRightTab(null);
        } else {
            setActiveRightTab(tab);
        }
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#d9d9d9',
    };

    const panelStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#d9d9d9',
        color: 'white',
        boxSizing: 'border-box',
        padding: '0',
    };

    const leftPanelStyle = {
        ...panelStyle,
        width: '52px',
        borderRight: '1px solid #000',
    };

    const rightPanelStyle = {
        ...panelStyle,
        width: '52px',
        borderLeft: '1px solid #000',
    };

    const mainViewportStyle = {
        flex: 1,
        backgroundColor: '#d9d9d9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '0',
    };

    const tabContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        marginBottom: '0',
    };

    const tabStyle = (isActive) => ({
        backgroundColor: isActive ? '#fff' : '#d9d9d9',
        color: '#000',
        border: 'none',
        padding: '10px 8px',
        cursor: 'pointer',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        margin: '0',
        textAlign: 'center',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        borderRight: isActive ? '4px solid #3498db' : '4px solid transparent',
        borderTop: isActive ? '1px solid #3498db' : 'none',
        borderBottom: isActive ? '1px solid #3498db' : 'none',
        borderRadius: '0',
    });

    const rightTabStyle = (isActive) => ({
        ...tabStyle(isActive),
        borderLeft: isActive ? '4px solid #3498db' : '4px solid transparent',
        borderRight: 'none',
    });

    return (
        <div style={containerStyle}>
            {/* Panel nút bên trái */}
            <div style={leftPanelStyle}>
                <div style={tabContainerStyle}>
                    <button
                        style={tabStyle(activeTab === 'clipping')}
                        onClick={() => handleLeftTabClick('clipping')}
                    >
                        Clipping
                    </button>
                    <button
                        style={tabStyle(activeTab === 'append')}
                        onClick={() => handleLeftTabClick('append')}
                    >
                        Append
                    </button>
                    <button
                        style={tabStyle(activeTab === 'label')}
                        onClick={() => handleLeftTabClick('label')}
                    >
                        Label
                    </button>
                    <button
                        style={tabStyle(activeTab === 'viewpoint')}
                        onClick={() => handleLeftTabClick('viewpoint')}
                    >
                        Viewpoint
                    </button>
                    <button
                        style={tabStyle(activeTab === 'hierarchy')}
                        onClick={() => handleLeftTabClick('hierarchy')}
                    >
                        Hierarchy
                    </button>
                </div>
            </div>

            {/* Left content */}
            {isLeftContentVisible && (
                <ResizableBox
                    width={250}
                    height={Infinity}
                    axis="x"
                    minConstraints={[50, Infinity]}
                    maxConstraints={[500, Infinity]}
                    resizeHandles={['e']}
                    handle={
                        <span
                            style={{
                                position: 'absolute',
                                right: '0',
                                top: '0',
                                bottom: '0',
                                width: '10px',
                                cursor: 'ew-resize',
                                backgroundColor: 'transparent',
                            }}
                        />
                    }
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            height: '100%',
                            boxSizing: 'border-box',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            overflowY: 'auto',
                        }}
                    >
                        {activeTab === 'clipping' && <div>Clipping Content</div>}
                        {activeTab === 'append' && <div>Append Content</div>}
                        {activeTab === 'label' && <div>Label Content</div>}
                        {activeTab === 'viewpoint' && <div>Viewpoint Content</div>}
                        {activeTab === 'hierarchy' && <div>Hierarchy Content</div>}
                    </div>
                </ResizableBox>
            )}

            {/* Viewport chính */}
            <div style={mainViewportStyle}>
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'white',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <h1>Cesium JS</h1>
                </div>
            </div>

            {/* Right content */}
            {isRightContentVisible && (
                <ResizableBox
                    width={250}
                    height={Infinity}
                    axis="x"
                    minConstraints={[50, Infinity]}
                    maxConstraints={[500, Infinity]}
                    resizeHandles={['w']} // Resize từ cạnh trái của right content
                    handle={
                        <span
                            style={{
                                position: 'absolute',
                                left: '0',
                                top: '0',
                                bottom: '0',
                                width: '10px',
                                cursor: 'ew-resize',
                                backgroundColor: 'transparent',
                            }}
                        />
                    }
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            height: '100%',
                            boxSizing: 'border-box',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            padding: '10px',
                            overflowY: 'auto',
                        }}
                    >
                        {activeRightTab === 'property' && <div>Property Content</div>}
                    </div>
                </ResizableBox>
            )}

            {/* Panel nút bên phải */}
            <div style={rightPanelStyle}>
                <div style={tabContainerStyle}>
                    <button
                        style={rightTabStyle(activeRightTab === 'property')}
                        onClick={() => handleRightTabClick('property')}
                    >
                        Property
                    </button>
                </div>
            </div>
        </div>
    );
}
