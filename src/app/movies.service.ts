import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(public _HttpClient: HttpClient) { }

  getTrendingMovies(): Observable<any> { // ==== movies
    return this._HttpClient.get('https://api.themoviedb.org/3/trending/movie/week?api_key=f80d9ce996b768bf9445a530eb4e7e11');
  }

  getTrendingTv(): Observable<any> { // ==== tvs
    return this._HttpClient.get('https://api.themoviedb.org/3/trending/tv/week?api_key=f80d9ce996b768bf9445a530eb4e7e11');
  }

  getMovieDetails(id): Observable<any> { // ==== movies details
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f80d9ce996b768bf9445a530eb4e7e11&language=en-US`);
  }

  getTvDetails(id): Observable<any> { // ==== tv details
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f80d9ce996b768bf9445a530eb4e7e11&language=en-US`);
  }
}
