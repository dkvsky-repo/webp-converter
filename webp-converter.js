#!/usr/bin/env node

/**
 * WebP Converter
 *
 * A script to convert images to WebP format.
 *
 * Copyright (c) 2025 David Kontorovsky.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { readdir, stat, unlink } from "fs/promises";
import { extname, join } from "path";
import readline from "readline";
import ora from "ora";
import chalk from "chalk";
import figlet from "figlet";
import sharp from "sharp";

figlet("WebP  Converter", (err, data) => {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(chalk.blue.bold(data));
  console.log("  Version 1.0.0\n");
  console.log(
    chalk.blue.bold(" ----------------------------------------------------\n"),
    chalk.blue.bold("🚀 Convert JPG, JPEG, and PNG images to WebP format.\n"),
    chalk.blue.bold("----------------------------------------------------\n"),
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Current directory: ${process.cwd()}`);

  rl.question("Path to images: ", async (directory) => {
    const spinner = ora("Processing images...").start();

    try {
      const files = await readdir(directory);
      const imageFiles = files.filter((file) =>
        [".jpg", ".jpeg", ".png"].includes(extname(file).toLowerCase()),
      );

      if (imageFiles.length === 0) {
        spinner.fail("No images found to convert.");
        rl.close();
        return;
      }

      let convertedCount = 0;
      let totalOriginalSize = 0;
      let totalNewSize = 0;

      for (const file of imageFiles) {
        const inputFilePath = join(directory, file);
        const outputFilePath = inputFilePath.replace(
          /\.(jpg|jpeg|png)$/i,
          ".webp",
        );

        const originalStats = await stat(inputFilePath);
        totalOriginalSize += originalStats.size;

        spinner.text = `Processing ${file}...`;

        try {
          // Check if the output file already exists and delete it
          await unlink(outputFilePath);
        } catch (err) {
          if (err.code !== 'ENOENT') {
            console.error(`Error deleting file: ${outputFilePath}`, err);
            continue;
          }
        }

        try {
          await sharp(inputFilePath).toFormat('webp').toFile(outputFilePath);
          const newStats = await stat(outputFilePath);
          totalNewSize += newStats.size;
          convertedCount++;
        } catch (err) {
          console.error(`Error converting file: ${inputFilePath}`, err);
        }
      }

      spinner.succeed(chalk.white("All images have been converted."));
      console.log(
        chalk.red(
          `🤯  Total original size: ${(totalOriginalSize / 1024).toFixed(2)} KB`,
        ),
      );
      console.log(
        chalk.green(
          `🥳  Total new size: ${(totalNewSize / 1024).toFixed(2)} KB`,
        ),
      );
      const sizeSaved = totalOriginalSize - totalNewSize;
      const percentageSaved = ((sizeSaved / totalOriginalSize) * 100).toFixed(2);
      console.log(
        chalk.white(
          `😃  Total size saved: ${(sizeSaved / 1024).toFixed(2)} KB = ${percentageSaved}% savings!!!`,
        ),
      );
      rl.close();
    } catch (err) {
      spinner.fail(`Error reading directory: ${err.message}`);
      rl.close();
    }
  });
});