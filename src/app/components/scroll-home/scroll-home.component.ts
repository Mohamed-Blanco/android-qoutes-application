import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { Clipboard } from '@angular/cdk/clipboard'
import { SocialShareService } from '../../services/social-share.service';
import { DatabaseService } from '../../services/database.service';
import { favourite } from '../../services/favourite';
import { NgForm } from '@angular/forms';
import { ScreenshotService } from '../../services/screenshot.service';
import { environment } from '../../../environment';
import { Qoutes } from '../../services/qoute';



@Component({
  selector: 'app-scroll-home',
  templateUrl: './scroll-home.component.html',
  styleUrl: './scroll-home.component.css'
})
export class ScrollHomeComponent {

  expand: boolean = false;
  loading: boolean = true;
  background_color: string = environment.background_color;
  qoutes_color: string = environment.qoutes_color
  text_color: string = environment.text_color
  qoutes_bottom_color: string = environment.qoutes_bottom_color
  storeName: string = "favourite"
  favourite !: favourite[];
  headtitle: string = "Qoutes :";

  constructor(private screenshotService: ScreenshotService, private databaseService: DatabaseService, private supabaseService: SupabaseService, private clipboard: Clipboard, private socialShareService: SocialShareService) { }


  async ngOnInit(): Promise<void> {

    await this.databaseService.initializeDatabase();
    await this.selectQoutes();
    this.favourite = await this.getAllFavorites();
    this.loading = false;


  }

  async captureScreenshot(element: number) {
    try {
      await this.screenshotService.captureAndDownloadScreen('item' + element);

      document.getElementById('savedelement')?.classList.remove('scale-0')
      document.getElementById('savedelement')?.classList.remove('opacity-0')
      document.getElementById('savedelement')?.classList.add('scale-100')
      document.getElementById('savedelement')?.classList.add('opacity-100')


      setTimeout(() => {
        document.getElementById('savedelement')?.classList.remove('scale-100')
        document.getElementById('savedelement')?.classList.add('scale-0')
      }, 2300)
    } catch (error) {
      // Handle error
    }
  }

  // Capture screenshot with custom options
  async captureCustomScreenshot() {
    try {
      const screenshot = await this.screenshotService.captureScreenshot('elementId', {
        format: 'jpeg',
        quality: 2 // Higher scale for better resolution
      });

      // Optionally save or share
      await this.screenshotService.saveScreenshot(screenshot);
      // Or
      await this.screenshotService.shareScreenshot(screenshot);
    } catch (error) {
      // Handle error
    }
  }

  async addFavorite(content: string, author: string): Promise<void> {
    const newFavourite: Omit<favourite, 'id_favourite'> = {
      content: content,
      author: author,
      created_at: new Date().toISOString(),
    };
    this.headtitle = "Favorites :"
    this.databaseService.addTofavorites<favourite>(this.storeName, newFavourite);
    this.selectQoutes()

  }

  async deleteFav(content: string) {


    await this.databaseService.deleteFavourite(this.storeName, content);
    await this.getAllFavorites()
    await this.selectQoutes()
  }

  async getAllFavorites(): Promise<favourite[]> {

    this.favourite = await this.databaseService.getAll("favourite")

    return this.favourite;
  }

  pageFavorite: boolean = false;

  Switchfavourite() {
    if (this.pageFavorite) {
      this.pageFavorite = false;
    } else {
      this.pageFavorite = true;
    }
  }


  copyTo(qoute: string) {

    this.clipboard.copy(qoute)

    document.getElementById('Copymessage')?.classList.remove('scale-0')
    document.getElementById('Copymessage')?.classList.remove('opacity-0')
    document.getElementById('Copymessage')?.classList.add('scale-100')
    document.getElementById('Copymessage')?.classList.add('opacity-100')



    setTimeout(() => {
      document.getElementById('Copymessage')?.classList.remove('scale-100')
      document.getElementById('Copymessage')?.classList.add('scale-0')
    }, 2300)
  }


  title!: string
  text!: string
  url!: string


  shareContent() {
    this.socialShareService.shareContent({
      title: this.title,
      text: this.text,
      url: this.url
    });
  }


  Qoutes_data: Qoutes[] = [];
  qouteToPass !: Qoutes;

  PassQoute(pass: Qoutes) {
    this.expand = true
    this.qouteToPass = pass;
  }

  selectQoutes() {
    this.loading = true
    this.Qoutes_data = [];
    this.supabaseService.selectQoutes(this.Qoutes_data)
      .then(async (response) => {

        for (let Qte of response) {
          let fav = await this.databaseService.checkFavorite(this.storeName, Qte.content)
          let newQoute: Qoutes = {
            content: Qte.content,
            author: Qte.author,
            favorited: fav
          }
          this.Qoutes_data.push(newQoute)
        }

        this.loading = false
      })
      .catch((error) => {
        console.log(error)

        this.loading = false
        let newQoute: Qoutes = {
          content: "test qoute , this means that there is just for testing ",
          author: "tester",
          favorited: false
        }
        this.Qoutes_data.push(newQoute)
        this.Qoutes_data.push(newQoute)
        this.Qoutes_data.push(newQoute)
        this.Qoutes_data.push(newQoute)
      });

  }


}
