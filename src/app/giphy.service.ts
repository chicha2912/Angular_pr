import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private apiKey: string = 'UUwW7KXiLgfH1VlGnaTtqYTYlub9hg8X'; 

  constructor() { }

  async searchGifs(query: string): Promise<any> {
    const response = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: {
        api_key: this.apiKey,
        q: query,
        limit: 20 
      }
    });
    return response.data.data; 
  }
}
