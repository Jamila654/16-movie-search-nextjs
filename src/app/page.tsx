"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect, ChangeEvent } from "react";

import Image from "next/image";

export default function Home() {
  type MovieDetails = {
    Title: string;
    Year: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Genre: string;
    Director: string;
    Actors: string;
    Runtime: string;
    Released: string;
  };

  const [search, setsearch] = useState<string>("");
  const [movieDetails, setmovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<string | null>(null);

  const handleSearchClick = async (): Promise<void> => {
    setloading(true);
    seterror(null);
    setmovieDetails(null);

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${search}&apikey=ce970688`
      );
      const data = await response.json();
      setmovieDetails(data);
    } catch (error: any) {
      seterror(error.message());
    } finally {
      setloading(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setsearch(e.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card>
          <CardHeader className=" text-center">
            <CardTitle>Movie Search</CardTitle>
            <CardDescription>
              Search for any movies and display details
            </CardDescription>
          </CardHeader>
          <CardContent className=" flex gap-2">
            <Input
              placeholder="Enter a movie title"
              value={search}
              onChange={handleChange}
            />
            <Button onClick={handleSearchClick}>Search</Button>
          </CardContent>
          <CardFooter>
            {loading && (
              <div className="loading w-full flex items-center justify-center">
                <ClipLoader />
              </div>
            )}
            {error && <div className="error">{error}</div>}
            {movieDetails && (
              <div className="flex flex-col items-center justify-center gap-6">
              <Image
                src={movieDetails.Poster}
                alt={movieDetails.Title}
                width={200}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <h2 className="text-2xl font-bold text-center">{movieDetails.Title}</h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-left w-full max-w-md">
                <p className="font-bold">Actors:</p>
                <p>{movieDetails.Actors}</p>
            
                <p className="font-bold">Director:</p>
                <p>{movieDetails.Director}</p>
            
                <p className="font-bold">Genre:</p>
                <p>{movieDetails.Genre}</p>
            
                <p className="font-bold">Plot:</p>
                <p>{movieDetails.Plot}</p>
            
                <p className="font-bold">Released:</p>
                <p>{movieDetails.Released}</p>
            
                <p className="font-bold">Runtime:</p>
                <p>{movieDetails.Runtime}</p>
            
                <p className="font-bold">Year:</p>
                <p>{movieDetails.Year}</p>
            
                <p className="font-bold">IMDb Rating:</p>
                <p>{movieDetails.imdbRating}</p>

              </div>
              </div>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
