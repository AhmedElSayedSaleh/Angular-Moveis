import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  id: string;
  name: string;
  movieDetails: any;
  imgPrefix = 'https://image.tmdb.org/t/p/w500';
  isLoading = false;
  moviesTopTen: any = [];
  tvsTopTen: any = [];

  constructor(public _ActivatedRoute: ActivatedRoute, public _MoviesService: MoviesService) {
    this.id = _ActivatedRoute.snapshot.paramMap.get('id');
    this.name = _ActivatedRoute.snapshot.paramMap.get('name');

    _MoviesService.getMovieDetails(this.id).subscribe(movieData => {
      if (movieData.title !== this.name) {
        _MoviesService.getTvDetails(this.id).subscribe(tvData => {
          this.movieDetails = tvData;
          this.isLoading = true;
        }, err => {
          console.log(err);
        });
      }
      else {
        this.movieDetails = movieData;
        this.isLoading = true;
      }
    }, err => {
      console.log(err);
    });


    _MoviesService.getTrendingMovies().subscribe(movies => {
      for (let i = 0; i < 10; i++)
      {
        this.moviesTopTen.push(movies.results[i]);
      }
    });

    _MoviesService.getTrendingTv().subscribe(tvs => {
      for (let i = 0; i < 10; i++)
      {
        this.tvsTopTen.push(tvs.results[i]);
      }
    });

  }

  ngOnInit(): void {
  }

}
