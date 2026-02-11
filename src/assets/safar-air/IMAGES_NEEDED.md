# Images Needed for Safar Air International

## Required Images

Please add the following images to the `src/assets/images/` directory:

### Main Images
- `logo.png` - Company logo (recommended: 200x200px)
- `hero.png` - Hero section background (recommended: 1920x1080px)
- `about.png` / `travelConceptWorldwide.png` - About section image
- `beautifulCollageTravel.png` - Why Choose Us section image
- `map.png` - World map image
- `contact.png` - Contact section image

### Destination Images (6 images)
- `dest1.png` through `dest6.png` - Various destination images

### Package Images (16 images)
- `pkg1.jpg` through `pkg8.jpg` - Package thumbnails
- `pkg1.png` through `pkg8.png` - Package cards (if different from .jpg)

### Popular Destinations
- `manila.png` - Manila destination
- `dubai.png` - Dubai destination
- `france.png` - France/Paris destination
- `himalya.png` - Himalaya destination

### Country Images
- `japan.png` - Japan/Tokyo
- `italy.png` - Italy/Rome
- `usa.png` - United States
- `europe.png` - Europe

### User/Testimonial Images (3 images)
- `user1.png`, `user2.png`, `user3.png` - Customer profile pictures

### Icons/Illustrations
- `plane.png` - Plane icon/illustration
- `globe.png` / `glob.png` - Globe icon
- `travel.png` - Travel icon
- `coin.png` - Price/coin icon
- `time.png` - Time/clock icon
- `date.png` - Calendar/date icon
- `group84.png` - Decorative group icon
- `parachute.png` - Adventure icon
- `skyline.png` - City skyline icon
- `cruise.png` - Cruise ship icon
- `wave.png` - Wave/sea icon
- `commsVector.png` - Communication vector

### Video Files
Place in `src/assets/video/`:
- `oneVid.mp4` - First video
- `twoVid.mp4` - Second video
- `video1.png` - Video 1 thumbnail
- `video2.png` - Video 2 thumbnail

### Destination Highlights
- `highlight.png` - Highlights background image

## Image Sources

You can get free high-quality images from:
- **Unsplash**: https://unsplash.com/ (best for travel photos)
- **Pexels**: https://www.pexels.com/
- **Pixabay**: https://pixabay.com/
- **Freepik**: https://www.freepik.com/ (with attribution)

## Image Specifications

### Recommended Sizes
- **Hero images**: 1920x1080px (Full HD)
- **Destination cards**: 800x600px
- **Package thumbnails**: 600x400px
- **User avatars**: 200x200px (square)
- **Icons**: 100x100px or SVG
- **Logo**: 400x400px (with transparency)

### Format
- Use **PNG** for images with transparency (logos, icons)
- Use **JPG** for photographs (smaller file size)
- Use **WebP** for better compression (optional)

### Optimization
Before adding images, optimize them using:
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Image optimization
- [ImageOptim](https://imageoptim.com/) - Mac app for optimization

## Quick Setup with Placeholder Images

If you want to test the website immediately, you can use Unsplash URLs as placeholders:

```javascript
export const hero = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop';
export const dest1 = 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop'; // Paris
export const dest2 = 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=600&fit=crop'; // Dubai
// ... add more as needed
```

## After Adding Images

1. Update `src/assets/index.js` with your image paths
2. Test the website to ensure all images load
3. Optimize images for web performance
4. Check image alt text for accessibility

---

**Note**: Make sure you have the rights to use all images in your commercial project!

