# WebP Converter

A script to convert JPG, JPEG, and PNG images to WebP format using Node.js. 

## Features

- Converts images in a specified directory to WebP format.
- Displays the total original size, new size, and size saved after conversion.

## Requirements

- Node.js (v14 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/webp-converter.git
cd webp-converter
```

2. Navigate to the project directory and install the dependencies:

   ```sh
   npm install
   ```

3. Make the script executable:

   ```sh
   chmod +x webp-converter.js
   ```

4. Link the package globally to use the `webp-converter` command from anywhere:

   ```sh
   npm link
   ```

## Usage

1. Run the `webp-converter` command:

   ```sh
   webp-converter
   ```

2. Enter the path to the directory containing the images you want to convert when prompted.

3. The script will process the images and convert them to webp format.

## Example
```
$ webp-converter

WebP  Converter
  Version 1.0.0

 ----------------------------------------------------
🚀 Convert JPG, JPEG, and PNG images to WebP format.
----------------------------------------------------

Current directory: /Users/yourusername/webp-converter
Path to images: ../desktop/images
Processing images...

All images have been converted.
🤯  Total original size: 1024.00 KB
🥳  Total new size: 512.00 KB
😃  Total size saved: 512.00 KB
```

## Dependencies

- [chalk](https://www.npmjs.com/package/chalk)
- [figlet](https://www.npmjs.com/package/figlet)
- [ora](https://www.npmjs.com/package/ora)
- [sharp](https://www.npmjs.com/package/sharp)


## License

This project is licensed under the MIT License.

## Author

David Kontorovsky.
