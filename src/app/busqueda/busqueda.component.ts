import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  gifs: any[] = [];
  searchHistory: string[] = [];
  searchQuery: string = '';
  noResults: boolean = false;

  constructor(private giphyService: GiphyService) {}

  ngOnInit(): void {
    const storedHistory = localStorage.getItem('searchHistory');
    if (storedHistory) {
      this.searchHistory = JSON.parse(storedHistory);
    }
  }

  async searchGifs() {
    if (this.searchQuery.trim()) {
      this.gifs = await this.giphyService.searchGifs(this.searchQuery);
      this.noResults = this.gifs.length === 0;

      if (!this.searchHistory.includes(this.searchQuery)) {
        this.searchHistory.push(this.searchQuery);
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      }
    }
  }

  searchFromHistory(query: string) {
    this.searchQuery = query;
    this.searchGifs();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchGifs();
    }
  }
}