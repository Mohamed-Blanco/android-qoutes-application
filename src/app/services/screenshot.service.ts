import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem, FilesystemDirectory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import html2canvas from 'html2canvas';


@Injectable({
    providedIn: 'root'
})
export class ScreenshotService {
    letructor() { }


    async captureScreenshot(elementId: string, options?: {
        format?: 'png' | 'jpeg',
        quality?: number
    }): Promise<string> {
        let element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element with id ${elementId} not found`);
        }

        try {
            let canvas = await html2canvas(element, {
                useCORS: true,
                scale: options?.quality || 1
            });

            // Convert to base64 with specified format
            let format = options?.format || 'png';
            return canvas.toDataURL(`image/${format}`);
        } catch (error) {
            console.error('Error capturing screenshot:', error);
            throw error;
        }
    }

    /**
     * Convert Data URI to Blob
     * @param dataURI Base64 encoded image
     * @returns Blob object
     */
    private dataURItoBlob(dataURI: string): Blob {
        let byteString = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], { type: mimeString });
    }

    /**
     * Save screenshot to device storage
     * @param base64Image Base64 encoded image
     * @param fileName Name of the file to save
     * @returns Saved file details
     */
    async saveScreenshot(base64Data: string) {
        try {
            const platform = Capacitor.getPlatform();

            if (platform === 'android') {
                // Explicitly request permissions
                const permissionStatus = await Filesystem.requestPermissions();

                if (permissionStatus.publicStorage !== 'granted') {
                    console.error('Storage permissions not granted');
                    return;
                }
            }

            // Use a more generic path
            const fileName = `screenshot_${Date.now()}.png`;
            const result = await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: platform === 'android' ? Directory.Documents : Directory.Documents
            });

            console.log('Screenshot saved:', result);
            return result;

        } catch (error) {
            console.error('Screenshot save error', error);
            throw error;
        }
    }

    /**
     * Share screenshot across platforms
     * @param base64Image Base64 encoded image
     * @param fileName Name of the file to share
     */
    async shareScreenshot(base64Image: string, fileName: string = `screenshot_${new Date().getTime()}.png`): Promise<void> {
        if (!Capacitor.isNativePlatform()) {
            this.downloadScreenshotWeb(base64Image, fileName);
            return;
        }

        try {
            let blob = this.dataURItoBlob(base64Image);
            let file = new File([blob], fileName, { type: blob.type });

            await Share.share({
                title: 'Screenshot',
                text: 'Check out this screenshot',
                files: [fileName] //to be fixed 
            });
        } catch (error) {
            console.error('Error sharing screenshot:', error);
            throw error;
        }
    }

    /**
     * Download screenshot on web platforms
     * @param base64Image Base64 encoded image
     * @param fileName Name of the file to download
     */
    private downloadScreenshotWeb(base64Image: string, fileName: string): void {
        let link = document.createElement('a');
        link.download = fileName;
        link.href = base64Image;
        link.click();
    }

    /**
     * Capture and download screenshot in one method
     * @param elementId ID of the element to capture
     * @param options Screenshot capture options
     */
    async captureAndDownloadScreen(elementId: string, options?: {
        format?: 'png' | 'jpeg',
        quality?: number
    }): Promise<void> {
        try {
            let screenshotURI = await this.captureScreenshot(elementId, options);
            await this.saveScreenshot(screenshotURI);
        } catch (error) {
            console.error('Error capturing and downloading screenshot:', error);
        }
    }
}