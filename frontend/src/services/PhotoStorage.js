import React, { useState, useEffect } from 'react';

const PhotoStorage = {
  // Get all photos from localStorage
  getPhotos: () => {
    const photos = localStorage.getItem('kegiatanPhotos');
    return photos ? JSON.parse(photos) : [];
  },

  // Save new photo
  savePhoto: (photoData) => {
    const photos = PhotoStorage.getPhotos();
    const newPhoto = {
      id: Date.now(),
      ...photoData,
      createdAt: new Date().toISOString()
    };
    photos.push(newPhoto);
    localStorage.setItem('kegiatanPhotos', JSON.stringify(photos));
    return newPhoto;
  },

  // Update existing photo
  updatePhoto: (id, photoData) => {
    const photos = PhotoStorage.getPhotos();
    const index = photos.findIndex(photo => photo.id === id);
    if (index !== -1) {
      photos[index] = {
        ...photos[index],
        ...photoData,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('kegiatanPhotos', JSON.stringify(photos));
      return photos[index];
    }
    return null;
  },

  // Delete photo
  deletePhoto: (id) => {
    const photos = PhotoStorage.getPhotos();
    const filteredPhotos = photos.filter(photo => photo.id !== id);
    localStorage.setItem('kegiatanPhotos', JSON.stringify(filteredPhotos));
    return filteredPhotos.length !== photos.length;
  },

  // Upload image to base64
  uploadImage: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};

export default PhotoStorage;