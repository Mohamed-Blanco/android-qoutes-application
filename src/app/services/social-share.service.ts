import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';

@Injectable({
    providedIn: 'root'
})
export class SocialShareService {
    async shareContent(options: {
        title: string,
        text: string,
        url?: string
    }) {
        try {
            await Share.share({
                title: options.title,
                text: options.text,
                url: options.url || '',
                dialogTitle: 'Share via'
            });
        } catch (error) {
            console.error('Share failed', error);
        }
    }
}