---
layout: post
title: "Mastering Workflows as a Blind Programmer: Why the Terminal and Browser are All I Need (Kind of)"
date: 2024-08-22 022:00:00
categories:
  - accessibility
  - programming
---

Sometimes, colleagues ask me: "How do you work?" or "What tools do you use?".
Other times, I feel them asking themselves these questions and fear to annoy me asking for that.

In this article, I explain what tools do I use in my everyday work routines.

## Where it all begins

In the college, a teaching assistant once asked me: "Why don't you use terminal? You can use it to do everything in text based interface.".
That was a very interesting to me since blind people are usually suffering from poor accessibility of widely used applications.
If you are signed in to any mailing list or forums for the blind, you can always see questions like "Is there an application to convert mov to mp4 video formats?".
Moreover, exploring new Graphical User Interface is a long process, and usually is different experience from an app to another.
That's why I found this question pretty interesting and started searching for how to do it.

That was in 2016.
I was choosing between Mac OS and Windos OS.
I found Linux back then pretty basic and don't cover my multilingual needs as an Arabic and English speaker.
Since WSL was not a thing, the obvious choice was Mac OS.
At worst case scenario, I may install Windows as my main OS or via Bootcamp and stop using Mac OS entirely.

## Early Days

I decided to buy my first Macbook Pro in Summer 2017, and started learning about Xcode and Terminal.
During Summer Internship in 2018, a colleague told me that I can use vim as my main editor.
I gave it a try, and its learning curve was a little steep.
Because of being comparable to Visual Studio Code, which was not accessible enough that days, I decided to learn vim more and more.
And guess what? It's my main editor and its variant NeoVim.

By the time, I was searching for doing stuff via terminal.
I was asking Google Search questions like: "How to convert mov to mp4", and make sure to append "in terminal".
Sometimes, I need Mac specific answers, and mostly linux solutions were working as well.

I got impressed by wide variety of software I could use free of charge via terminal.
I got used to the terminal in doing everything.
I was able to do commands like
```bash
$ brew install ffmpeg
$ ffmpeg -i file.mov file.m4a
```
That was the turning point where I decided to leave GUI entirely, even IDEs.

## What is my Workflow using Terminal and Browser?

Back to why you are here, and how do I use terminal and browser most of the time.

### Web Browser

Do you know why people use web browsers? That's correct, for web browsing.
Web pages usually contains tags indicating headings, landmarks, links as well as other kinds of objects.
Screen readers allows you to browse that web page using through these objects.
For example, I press 'h' to go to next heading, 'l' for next link and 'k' for landmarks.
Actually, 'k' is a custom one that I made since I find it useful.
This tip, rather small, yet boosts web navigation significantly.

For forms, I can switch from browse mode to focus mode to make all buttons pressesaffect edit box content.
In VoiceOver, it is about turning QuickNav on/off.

I switch between Safari (main browser), Google Chrome and Micrsofot Edge.

### Terminal

I use terminal for coding, reading math content and in many other automation usecases.
Let me explain each in the following subsubsections.

#### Code Editing

I use NeoVim or Vim as my main editor.
I find it attractive for many reasons.

* First of all, it is fully text based.
In other words, every piece of it is readable by the screen reader.
* In addition, it can be configured to work with whatever programming language you want.
* One reason that makes me stick to it particularly compared to GUI editors is being programmable.
Vim is an editor that has its own programming language, which name can be guessed ("Vim").
I made my keyboard shortcuts (aka mappings) and added appreviations.
For instance, I made Space+w+q a shortcut for saving all files and quit all of them. By default, you have to save them one by one, or write corresponding command "<Esc>:wqa!<cr>".
Appreviations are useful to expand frequently written stuff, as in LaTeX. The below vim line expands "beeq" to write LaTeX syntax for equation.
```Vim
iabbrev beeq \begin{equation}<CR> \label{}<CR> \end{equation}<Up><Left>
```

You may check [my neovim setup repository](https://github.com/Mohamed-E-Fayed/neovim-development-environment) for more details.
I made it in shell scripting and vim as a kind of automating the process of getting IDE on a new machine.

#### Reading Math Content

Usually, as a researcher, most math I need is found in research papers that are usually found on [arxiv.org](arxiv.org).
There, you can download the latex source code of the paper.
I download that tar file and read its latex source code.
Unfortunately, most math content in the PDFs, especially those converted from LaTeX are totally inaccessible.

#### Automations using Shell Scripting

Since I use terminal a lot, I find it annoying to repeat many commands.
So, I shorten them via aliases and functions.
I may also go further and automate a large sequence of operations, as in [neovim setup](https://github.com/Mohamed-E-Fayed/neovim-development-environment) or looping over files changing their extensions or unzipping them.
Do you know why there is no command like ```mkcd```, a command to make directory make it working directory?!

```bash
mkcd() {
mkdir -p "$@" && cd "$@"
}
```

I found myself doing those two commands in a row.
Similarly for git clone and change directory! Let's made it just ```gccd```.
I think you got the concept.
Here is my ```gccd``` function in case you are interested.

```bash
gccd() {
    url="$@"
    path=${url/*\/}
    path=${path/.*}
    git clone "${url}"
    cd "${path}"
}
```

## Do I need any other applications?

For productivity purposes, I use some other applications to get stuff done faster.

* For organization purposes, I use Apple Mail, Apple Reminders, Apple Calendar, and Microsoft Teams.
If I want to send myself an email upon job success, I send email via terminal.
* For Cloud Services, I use both OneDrive and Google Drive since I rclone mount feature was not stable.
I don't want to bother myself running rclone everytime I want to sync files.
I just want them to be ready on all my devices whenever I need them.
* To run Windows, I have to use either VMWare Fusion or Virtual Box.
I may start running virtual machine via virtualbox command line, but I find VMWare easier in controlling the graphical interface of Windows.
* I use Apple Keynote and/or Microsoft PowerPoint for making presentations.
* For meetings, zoom and Microsoft Teams are mostly used. I occasionally use Google Meet.
* To view PDFs, I usually use Apple Preview.
If I want to hear the PDF while drinking coffee, I use Claro PDF or Claro Speak.

Starting at the 4th bullet point, I have not tried to find alternative via terminal.
They are made for visual purposes.
I don't expect to find good alternatives.
You know, it is meaningless to make video editor via terminal.

## At the End of the Day

I find this style very suitable to me to make progress with minimal intervention from other people to help me due to software inaccessibility and to be independent most of the time.
I hope this article is useful and insightful to you.


