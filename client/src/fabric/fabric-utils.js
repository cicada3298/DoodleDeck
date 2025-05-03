
export const initializeFabric = async(canvasEl, containerEl)=> {
    try{
        const {Canvas, PencilBrush} = await import('fabric')

        const canvas = new Canvas(canvasEl, {
            preserveObjectStacking : true,
            isDrawingMode : false,
            renderOnAddRemove : true
        })

        const brush = new PencilBrush(canvas)
        brush.color = "#000000"
        brush.width = 5
        canvas.freeDrawingBrush = brush
        return canvas
    }catch(e){
        console.error('Failed to load fabric',e);
        return null
    }
}

export const centerCanvas = (canvas) => {
    if(!canvas || !canvas.wrapperEl)return;
    const canvasWrapper = canvas.wrapperEl;

    canvasWrapper.style.width = `${canvas.width}px`;
    canvasWrapper.style.height = `${canvas.height}px`;

    canvasWrapper.style.position = "absolute";
    canvasWrapper.style.top = "50%";
    canvasWrapper.style.left = "50%";
    canvasWrapper.style.transform = "translate(-50%, -50%)";
}
