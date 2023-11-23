class getText {
    constructor(quill: Quill, options: any) {
        this.quill = quill;
        this.options = options || {};
        const debug = !!options.debug;
        const suppressErrorLogging = !!options.suppressErrorLogging;
        this.Logger = new ConsoleLogger(debug, suppressErrorLogging);

        warnAboutOptions(options, this.Logger);
        const onImageDrop = async (dataUrl: string) => {
            this.Logger.log("onImageDrop", { dataUrl });
            const dataUrlCompressed = await this.downscaleImageFromUrl(dataUrl);
            this.insertToEditor(dataUrlCompressed, imageCompressor.b64toBlob(dataUrlCompressed));
        };
        this.imageDrop = new ImageDrop(quill, onImageDrop, this.Logger);

        this.Logger.log("fileChanged", { options, quill, debug });

        var toolbar = this.quill.getModule("toolbar");
        if (toolbar) {
            toolbar.addHandler("image", () => this.selectLocalImage());
        } else {
            this.Logger.error('Quill toolbar module not found! need { toolbar: // options } in Quill.modules for image icon to sit in')
        }
    }

    Test2
}

export { getText };
export default getText;