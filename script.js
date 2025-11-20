const { useState, useRef, useEffect } = React;
const Rnd = window.Rnd; // react-rnd is available globally via CDN

// Utility to download files
const downloadFile = (filename, content, type) => {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Unique ID generator
const generateId = () => `el-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// --- Draggable/Resizable Element Wrapper ---
function CanvasElement({ element, onSelect, onUpdate }) {
    const handleDragStop = (e, d) => {
        onUpdate(element.id, { style: { x: d.x, y: d.y } });
    };

    const handleResizeStop = (e, direction, ref, delta, position) => {
        onUpdate(element.id, {
            style: {
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                x: position.x,
                y: position.y,
            },
        });
    };

    const handleClick = (e) => {
        e.stopPropagation(); // Prevent canvas click from deselecting
        onSelect(element.id);
    };

    // Render element content based on its type and properties
    const renderElementContent = () => {
        const elementStyle = {
            backgroundColor: element.style.backgroundColor,
            color: element.style.color,
            fontSize: `${element.style.fontSize}px`, // Add px for rendering
            fontWeight: element.style.fontWeight,
            textAlign: element.style.textAlign,
            textDecoration: element.style.textDecoration,
            border: element.style.border,
        };

        switch (element.type) {
            case 'div':
                return <div className="design-element" style={elementStyle}></div>;
            case 'h1':
                return <h1 className="design-element" style={elementStyle}>{element.content || 'Título'}</h1>;
            case 'p':
                return <p className="design-element" style={elementStyle}>{element.content || 'Párrafo de texto'}</p>;
            case 'button':
                return <button className="design-element" style={elementStyle} onClick={e => e.preventDefault()}>{element.content || 'Botón'}</button>;
            case 'link':
                return <a className="design-element" href={element.href || '#'} target="_blank" rel="noopener noreferrer" style={elementStyle} onClick={e => e.preventDefault()}>{element.content || 'Enlace'}</a>;
            case 'image':
                return <img className="design-element" src={element.src || 'https://picsum.photos/150/100'} alt="Diseño de Imagen" style={elementStyle} />;
            case 'icon':
                return <i className={`design-element ${element.iconClass || 'fas fa-star'}`} style={{...elementStyle, fontSize: `${element.style.fontSize || 24}px`}}></i>;
            default:
                return <div className="design-element" style={elementStyle}>Unknown Element</div>;
        }
    };

    return (
        <Rnd
            size={{ width: element.style.width, height: element.style.height }}
            position={{ x: element.style.x, y: element.style.y }}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            minWidth={20}
            minHeight={20}
            bounds="parent" // Keep element within canvas
            className={`element-wrapper ${element.isSelected ? 'selected' : ''}`}
            onMouseDown={handleClick} // Select on click/drag start
        >
            {renderElementContent()}
        </Rnd>
    );
}

// --- Export Modal Component ---
function ExportModal({ elements, onClose, onDownload }) {
    const [exportType, setExportType] = useState('internal-css'); // 'internal-css', 'external-css', 'component-html'
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [generatedCss, setGeneratedCss] = useState('');

    const generateCode = (elements, type) => {
        let htmlContent = '';
        let cssContent = '';
        let globalCss = `
html, body { margin: 0; padding: 0; height: 100%; width: 100%; }
body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; }
.canvas-exported { position: relative; width: 800px; min-height: 600px; background-color: #fff; overflow: hidden; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); }
`;
        const elementHtmls = [];

        elements.forEach(el => {
            const uniqueClass = `el-${el.id}`;
            let innerHtml = '';

            // --- Generate CSS rules for each element ---
            cssContent += `\n.${uniqueClass} {\n`;
            cssContent += `    position: absolute;\n`;
            cssContent += `    left: ${el.style.x}px;\n`;
            cssContent += `    top: ${el.style.y}px;\n`;
            cssContent += `    width: ${el.style.width}px;\n`;
            cssContent += `    height: ${el.style.height}px;\n`;
            cssContent += `    box-sizing: border-box;\n`; // Crucial for padding/border calculations
            cssContent += `    z-index: ${el.style.zIndex || 1};\n`;

            if (el.style.backgroundColor) cssContent += `    background-color: ${el.style.backgroundColor};\n`;
            if (el.style.color) cssContent += `    color: ${el.style.color};\n`;
            if (el.style.fontSize) cssContent += `    font-size: ${el.style.fontSize}px;\n`;
            if (el.style.fontWeight) cssContent += `    font-weight: ${el.style.fontWeight};\n`;
            if (el.style.textAlign) cssContent += `    text-align: ${el.style.textAlign};\n`;
            if (el.style.textDecoration) cssContent += `    text-decoration: ${el.style.textDecoration};\n`;
            if (el.style.border) cssContent += `    border: ${el.style.border};\n`; // For buttons, etc.

            // Ensure content is centered in the element wrapper if applicable
            if (el.type !== 'image' && el.type !== 'div') { // Text, button, link, icon
                 cssContent += `    display: flex;\n    align-items: center;\n    justify-content: ${el.style.textAlign === 'left' ? 'flex-start' : el.style.textAlign === 'right' ? 'flex-end' : 'center'};\n`;
                 cssContent += `    padding: 5px;\n`; // Default padding for text-like elements
            } else if (el.type === 'div') {
                 cssContent += `    padding: 5px;\n`; // Default padding for generic div
            }

            cssContent += `}\n`;

            // --- Generate HTML for each element ---
            switch (el.type) {
                case 'div':
                    innerHtml = ''; // Divs are empty containers by default
                    break;
                case 'h1':
                    innerHtml = el.content || 'Título';
                    break;
                case 'p':
                    innerHtml = el.content || 'Párrafo de texto';
                    break;
                case 'button':
                    innerHtml = el.content || 'Click Aquí';
                    break;
                case 'link':
                    innerHtml = el.content || 'Visitar Enlace';
                    break;
                case 'image':
                    innerHtml = `<img src="${el.src}" alt="Diseño de Imagen" style="width: 100%; height: 100%; object-fit: contain;">`;
                    break;
                case 'icon':
                    innerHtml = `<i class="${el.iconClass || 'fas fa-star'}"></i>`;
                    break;
                default:
                    innerHtml = 'Contenido Desconocido';
            }

            const tag = (el.type === 'h1' ? 'h1' :
                         el.type === 'p' ? 'p' :
                         el.type === 'button' ? 'button' :
                         el.type === 'link' ? `a href="${el.href || '#'}" target="_blank" rel="noopener noreferrer"` :
                         'div'); // Default to div for image, icon, div
            elementHtmls.push(`<${tag} class="${uniqueClass}">${innerHtml}</${tag}>`);
        });

        const fullCss = globalCss + cssContent;
        const canvasInnerHtml = elementHtmls.join('\n');

        if (type === 'internal-css') {
            htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Diseño Exportado</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
${fullCss}
    </style>
</head>
<body>
    <div class="canvas-exported">
${canvasInnerHtml}
    </div>
</body>
</html>`;
            return { html: htmlContent, css: '' };
        } else if (type === 'external-css') {
            htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Diseño Exportado</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="style.css"> </head>
<body>
    <div class="canvas-exported">
${canvasInnerHtml}
    </div>
</body>
</html>`;
            return { html: htmlContent, css: fullCss };
        } else if (type === 'component-html') {
            htmlContent = `<div class="canvas-exported" style="position: relative; width: 800px; min-height: 600px; background-color: #fff; overflow: hidden; box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);">
${canvasInnerHtml}
</div>
<style>
${cssContent}
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
`;
            return { html: htmlContent, css: '' }; // Component HTML usually includes its own styles
        }
        return { html: '', css: '' }; // Default empty
    };

    useEffect(() => {
        // Regenerate code whenever exportType or elements change
        const { html, css } = generateCode(elements, exportType);
        setGeneratedHtml(html);
        setGeneratedCss(css);
    }, [exportType, elements]);

    const handleDownloadClick = () => {
        onDownload(generatedHtml, generatedCss, exportType);
    };

    return (
        <div className="export-modal-overlay">
            <div className="export-modal-content">
                <h3>Exportar Código</h3>

                <div className="export-options">
                    <label>
                        <input
                            type="radio"
                            name="exportType"
                            value="internal-css"
                            checked={exportType === 'internal-css'}
                            onChange={(e) => setExportType(e.target.value)}
                        />
                        HTML con CSS Interno (un solo archivo)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="exportType"
                            value="external-css"
                            checked={exportType === 'external-css'}
                            onChange={(e) => setExportType(e.target.value)}
                        />
                        HTML con CSS Externo (dos archivos: HTML y `style.css`)
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="exportType"
                            value="component-html"
                            checked={exportType === 'component-html'}
                            onChange={(e) => setExportType(e.target.value)}
                        />
                        Solo Componente HTML y Estilos (para incrustar)
                    </label>
                </div>

                <h4>Código HTML Preview:</h4>
                <div className="export-code-display">{generatedHtml}</div>

                {exportType === 'external-css' && (
                    <>
                        <h4>Código CSS Preview (style.css):</h4>
                        <div className="export-code-display">{generatedCss}</div>
                    </>
                )}

                <div className="button-group">
                    <button onClick={handleDownloadClick}>Descargar</button>
                    <button className="secondary" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

// --- Main App Component ---
function App() {
    const [elements, setElements] = useState([]);
    const [selectedElementId, setSelectedElementId] = useState(null);
    const [showExportModal, setShowExportModal] = useState(false);
    const canvasRef = useRef(null);

    const selectedElement = elements.find(el => el.id === selectedElementId);

    // --- Drag & Drop for new elements from palette ---
    const handleDragStart = (e, type) => {
        e.dataTransfer.setData('elementType', type);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const elementType = e.dataTransfer.getData('elementType');
        const canvasRect = canvasRef.current.getBoundingClientRect();

        const x = e.clientX - canvasRect.left + canvasRef.current.scrollLeft - 50;
        const y = e.clientY - canvasRect.top + canvasRef.current.scrollTop - 25;

        const newElement = {
            id: generateId(),
            type: elementType,
            style: {
                x: x < 0 ? 0 : x,
                y: y < 0 ? 0 : y,
                width: elementType === 'image' ? 150 : (elementType === 'h1' ? 250 : 150),
                height: elementType === 'image' ? 100 : (elementType === 'h1' ? 60 : 40),
                backgroundColor: elementType === 'div' ? '#e0e0e0' : (elementType === 'button' ? '#007bff' : 'transparent'),
                color: elementType === 'button' ? '#ffffff' : '#333333',
                fontSize: elementType === 'h1' ? 28 : (elementType === 'p' ? 16 : 14),
                fontWeight: elementType === 'h1' ? 'bold' : 'normal',
                textAlign: 'center',
                textDecoration: 'none',
                border: elementType === 'button' ? 'none' : 'none',
            },
            content: elementType === 'h1' ? 'Título Principal' :
                     elementType === 'p' ? 'Este es un párrafo de ejemplo.' :
                     elementType === 'button' ? 'Click Aquí' :
                     elementType === 'link' ? 'Visitar Enlace' : '',
            src: elementType === 'image' ? 'https://picsum.photos/150/100' : '',
            href: elementType === 'link' ? 'https://www.google.com' : (elementType === 'button' ? '#' : ''),
            iconClass: elementType === 'icon' ? 'fas fa-star' : '',
            isSelected: true,
            zIndex: elements.length + 1, // Bring new element to front
        };

        setElements(prev => {
            const newElements = prev.map(el => ({ ...el, isSelected: false }));
            return [...newElements, newElement];
        });
        setSelectedElementId(newElement.id);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allows drop
    };

    // --- Element selection ---
    const handleSelectElement = (id) => {
        setElements(prev =>
            prev.map(el => ({
                ...el,
                isSelected: el.id === id,
            }))
        );
        setSelectedElementId(id);
    };

    const handleCanvasClick = (e) => {
        if (canvasRef.current && e.target === canvasRef.current) {
            setSelectedElementId(null);
            setElements(prev => prev.map(el => ({ ...el, isSelected: false })));
        }
    };

    // --- Update selected element's properties (for react-rnd and general props) ---
    const handleUpdateElement = (id, updates) => {
        setElements(prev =>
            prev.map(el =>
                el.id === id
                    ? {
                        ...el,
                        ...updates,
                        style: { ...el.style, ...updates.style },
                    }
                    : el
            )
        );
    };

    // --- Properties Panel Change Handlers ---
    const handleStyleChange = (prop, value) => {
        if (selectedElement) {
            handleUpdateElement(selectedElement.id, {
                style: { [prop]: value },
            });
        }
    };

    const handleContentChange = (value) => {
        if (selectedElement && (selectedElement.type === 'h1' || selectedElement.type === 'p' || selectedElement.type === 'button' || selectedElement.type === 'link')) {
            handleUpdateElement(selectedElement.id, { content: value });
        }
    };

    const handleSrcChange = (value) => {
        if (selectedElement && selectedElement.type === 'image') {
            handleUpdateElement(selectedElement.id, { src: value });
        }
    };

    const handleHrefChange = (value) => {
        if (selectedElement && (selectedElement.type === 'link' || (selectedElement.type === 'button' && value !== '#'))) {
            handleUpdateElement(selectedElement.id, { href: value });
        }
    };

    const handleIconClassChange = (value) => {
        if (selectedElement && selectedElement.type === 'icon') {
            handleUpdateElement(selectedElement.id, { iconClass: value });
        }
    };

    // --- Export Logic ---
    const handleExportCode = () => {
        setShowExportModal(true);
    };

    const handleDownloadExport = (htmlCode, cssCode, exportType) => {
        if (exportType === 'external-css') {
            downloadFile('index.html', htmlCode, 'text/html');
            downloadFile('style.css', cssCode, 'text/css');
        } else {
            downloadFile('index.html', htmlCode, 'text/html');
        }
        setShowExportModal(false);
    };


    return (
        <>
            <div className="sidebar">
                <h2>Elementos</h2>
                <div className="element-palette">
                    <h3>Arrastra y Suelta</h3>
                    <div className="draggable-item" draggable="true" onDragStart={(e) => handleDragStart(e, 'div')}>
                        <i className="fas fa-box"></i> Div (Contenedor)
                    </div>
                    <div className="draggable-item" draggable="true" onDragStart={(e) => handleDragStart(e, 'h1')}>
                        <i className="fas fa-heading"></i> Encabezado (H1)
                    </div>
                    <div className="draggable-item" draggable="true" onDragStart={(e) => handleDragStart(e, 'p')}>
                        <i className="fas fa-paragraph"></i> Párrafo
                    </div>
                    <div className="draggable-item" draggable="true" onDragStart={(e) => handleDragStart(e, 'button')}>
                        <i className="fas fa-hand-pointer"></i> Botón
                    </div>
                    <div className="draggable-item" draggable="true" onDragStart={(e) => handleDragStart(e, 'link')}>
                        <i className="fas fa-link"></i> Enlace
                    </div>
                    <div className="draggable-item" draggable="true" onDragStart={(e) => handleDragStart(e, 'image')}>
                        <i className="fas fa-image"></i> Imagen
                    </div>
                    <div className="draggable-item" draggable="true" onDragStart={(e) => handleDragStart(e, 'icon')}>
                        <i className="fas fa-star"></i> Ícono
                    </div>
                </div>
            </div>

            <div className="editor-area">
                <div className="toolbar">
                    <h1>Editor de Diseño Visual</h1>
                    <button onClick={handleExportCode}>Exportar Código</button>
                </div>
                <div
                    className="canvas-container"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleCanvasClick}
                >
                    <div ref={canvasRef} className="canvas">
                        {elements.map(el => (
                            <CanvasElement
                                key={el.id}
                                element={el}
                                onSelect={handleSelectElement}
                                onUpdate={handleUpdateElement}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="properties-panel">
                <h2>Propiedades</h2>
                {selectedElement ? (
                    <div>
                        <h3>Elemento: {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)}</h3>
                        {(selectedElement.type === 'h1' || selectedElement.type === 'p' || selectedElement.type === 'button' || selectedElement.type === 'link') && (
                            <>
                                <label>Texto:</label>
                                <textarea
                                    value={selectedElement.content}
                                    onChange={(e) => handleContentChange(e.target.value)}
                                ></textarea>
                            </>
                        )}

                        {selectedElement.type === 'link' && (
                            <>
                                <label>URL del Enlace:</label>
                                <input
                                    type="text"
                                    value={selectedElement.href || ''}
                                    onChange={(e) => handleHrefChange(e.target.value)}
                                />
                            </>
                        )}
                        {selectedElement.type === 'button' && (
                            <>
                                <label>URL del Botón (opcional):</label>
                                <input
                                    type="text"
                                    value={selectedElement.href || ''}
                                    onChange={(e) => handleHrefChange(e.target.value)}
                                    placeholder="#"
                                />
                                <label>Borde (ej. "1px solid #ccc"):</label>
                                <input
                                    type="text"
                                    value={selectedElement.style.border || ''}
                                    onChange={(e) => handleStyleChange('border', e.target.value)}
                                />
                            </>
                        )}


                        {selectedElement.type === 'image' && (
                            <>
                                <label>URL de Imagen:</label>
                                <input
                                    type="text"
                                    value={selectedElement.src || ''}
                                    onChange={(e) => handleSrcChange(e.target.value)}
                                />
                            </>
                        )}

                        {selectedElement.type === 'icon' && (
                            <>
                                <label>Clase de Ícono (ej. "fas fa-star"):</label>
                                <input
                                    type="text"
                                    value={selectedElement.iconClass || ''}
                                    onChange={(e) => handleIconClassChange(e.target.value)}
                                    placeholder="fas fa-star"
                                />
                                <a href="https://fontawesome.com/v6/icons" target="_blank" rel="noopener noreferrer" style={{color: '#61dafb', fontSize: '0.9em', display: 'block', marginTop: '-10px', marginBottom: '15px', textDecoration: 'underline'}}>Buscar Íconos</a>
                            </>
                        )}

                        {/* Common Styles for many elements */}
                        {(selectedElement.type === 'div' || selectedElement.type === 'button' || selectedElement.type === 'h1' || selectedElement.type === 'p' || selectedElement.type === 'link' || selectedElement.type === 'icon') && (
                            <>
                                <label>Color de Fondo:</label>
                                <input
                                    type="color"
                                    value={selectedElement.style.backgroundColor || '#ffffff'}
                                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                                />
                            </>
                        )}

                        {(selectedElement.type !== 'div' && selectedElement.type !== 'image') && ( // Elements with text
                            <>
                                <label>Color de Texto:</label>
                                <input
                                    type="color"
                                    value={selectedElement.style.color || '#333333'}
                                    onChange={(e) => handleStyleChange('color', e.target.value)}
                                />
                                <label>Tamaño de Fuente (px):</label>
                                <input
                                    type="number"
                                    value={selectedElement.style.fontSize || ''}
                                    onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value) || '')}
                                />
                                <label>Peso de Fuente:</label>
                                <select
                                    value={selectedElement.style.fontWeight || 'normal'}
                                    onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="bold">Negrita</option>
                                    <option value="lighter">Más Ligera</option>
                                    <option value="bolder">Más Negrita</option>
                                    <option value="100">100 (Thin)</option>
                                    <option value="200">200 (Extra-light)</option>
                                    <option value="300">300 (Light)</option>
                                    <option value="400">400 (Regular)</option>
                                    <option value="500">500 (Medium)</option>
                                    <option value="600">600 (Semi-bold)</option>
                                    <option value="700">700 (Bold)</option>
                                    <option value="800">800 (Extra-bold)</option>
                                    <option value="900">900 (Black)</option>
                                </select>
                                <label>Alineación de Texto:</label>
                                <select
                                    value={selectedElement.style.textAlign || 'center'}
                                    onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                                >
                                    <option value="left">Izquierda</option>
                                    <option value="center">Centro</option>
                                    <option value="right">Derecha</option>
                                </select>
                                <label>Decoración de Texto:</label>
                                <select
                                    value={selectedElement.style.textDecoration || 'none'}
                                    onChange={(e) => handleStyleChange('textDecoration', e.target.value)}
                                >
                                    <option value="none">Ninguna</option>
                                    <option value="underline">Subrayado</option>
                                    <option value="line-through">Tachado</option>
                                    <option value="overline">Sobrelínea</option>
                                </select>
                            </>
                        )}

                        <label>Ancho (px):</label>
                        <input
                            type="number"
                            value={selectedElement.style.width || ''}
                            onChange={(e) => handleStyleChange('width', parseInt(e.target.value) || '')}
                        />
                        <label>Alto (px):</label>
                        <input
                            type="number"
                            value={selectedElement.style.height || ''}
                            onChange={(e) => handleStyleChange('height', parseInt(e.target.value) || '')}
                        />
                         <label>Capa (Z-Index):</label>
                        <input
                            type="number"
                            value={selectedElement.style.zIndex || 1}
                            onChange={(e) => handleStyleChange('zIndex', parseInt(e.target.value) || 1)}
                        />
                        <button onClick={() => {
                            setElements(prev => prev.filter(el => el.id !== selectedElement.id));
                            setSelectedElementId(null);
                        }} style={{ backgroundColor: '#dc3545', marginTop: '20px' }}>
                            Eliminar Elemento
                        </button>
                    </div>
                ) : (
                    <p>Selecciona un elemento para editar sus propiedades.</p>
                )}
            </div>

            {showExportModal && (
                <ExportModal
                    elements={elements}
                    onClose={() => setShowExportModal(false)}
                    onDownload={handleDownloadExport}
                />
            )}
        </>
    );
}

// Renderizar la aplicación
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

```http://googleusercontent.com/image_generation_content/3
