# YouTube GIF Skeleton Clone Design

## Introduction
This document designs a simplified YouTube Gif. The goal of this project is to build a rough skeleton where the core functionality of YouTube is implemented.

## Background
YouTube is a video sharing platform that allows users to upload, view, rate, share, and comment on videos.

## Requirements
Users can sign in/out using their Google account
Users can upload videos while signed in
Videos should be transcoded to a 3 second gif
Users can view a list of uploaded videos (signed in or not)
Users can view individual videos (signed in or not)
High Level Design
diagram

## High Level Architecture:
<img width="946" alt="image" src="https://github.com/MuskanDubeyGithub/Youtube-Clone/assets/165841787/4dc45ace-64e9-4e42-91f2-ad568c52720d">

### Video Storage (Cloud Storage)
Google Cloud Storage is used to host the raw and processed videos. This is a simple, scalable, and cost effective solution for storing and serving large files.

### Video Upload Events (Cloud Pub/Sub)
When a video is uploaded, we publish a message to a Cloud Pub/Sub topic. This allows us to add a durability layer for video upload events and process videos asynchronously.

### Video Processing Workers (Cloud Run)
When a video upload event is published, a video processing worker receives a message from Pub/Sub and transcode the video. For transcoding the video we will use ffmpeg, which is a popular open source tool for video processing and it's widely used in industry (including at YouTube).

The nature of video processing can lead to inconsistent workloads, so we use Cloud Run to scale up and down as needed. Processed videos will be uploaded back to Cloud Storage.

### Video Metadata (Firestore)
After a video is processed, we store the metadata in Firestore. This allows us to display processed videos in the web client along with other relevant info (e.g. title, description, etc).

### Video API (Firebase Functions)
We use Firebase Functions to build a simple API that allows users to upload videos and retrieve video metadata. This can easily be extended to support additional Create, Read, Update, Delete (CRUD) operations.

### Web Client (Next.js / Cloud Run)
We use Next.js to build a simple web client that will allow users to sign in and upload videos. The web client is hosted on Cloud Run.

### Authentication (Firebase Auth)
We use Firebase Auth to handle user authentication. This allows us to easily integrate with Google Sign In.
