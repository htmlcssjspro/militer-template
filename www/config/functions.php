<?php

//*****************************************************************************
//*** Layout
//*****************************************************************************

function getLayout($layout = 'layout')
{
    // getLayoutElement('layouts', $layout);
    getFile(VIEWS . "/layouts/{$layout}.php");
}
function getHead($head = 'head')
{
    getLayoutElement('head', $head);
}
function getHeader($header = 'header')
{
    getLayoutElement('header', $header);
}
function getFooter($footer = 'footer')
{
    getLayoutElement('footer', $footer);
}
function getAside($aside = 'aside')
{
    getLayoutElement('aside', $aside);
}
function getDesignGrid($grid = 'design-grid')
{
    getLayoutElement('design-grid', $grid);
}

function getLayoutElement(string $type, string $name)
{
    getFile(VIEWS . "/layout/{$type}/{$name}.php");
}


//*****************************************************************************
//*** Content
//*****************************************************************************

function getMainContent(string $page)
{
    getFile(VIEWS . "/pages/{$page}.php");
}

function getSection(string $section)
{
    getFile(VIEWS . "/sections/{$section}/{$section}.php");
}
function getPopup(string $popup)
{
    getFile(VIEWS . "/popups/{$popup}/{$popup}.php");
}


function getFile(string $file)
{
    $fnf = "<!-- File {$file} not found -->";
    if (file_exists($file)) {
        require $file;
    } else {
        echo $fnf;
    }
}

function getTitle()
{
    global $title;
    return $title;
}
function getDescription()
{
    global $description;
    return $description;
}


//*****************************************************************************
//*** Assets
//*****************************************************************************

function getLayoutCSS(bool $preload = false)
{
    getCSS('layout', $preload);
}
function getMainCSS(bool $preload = false)
{
    getCSS('main', $preload);
}

function getCSS(string $css, bool $preload = false)
{
    $css = CSS . "/{$css}.css";
    if (file_exists(_ROOT_ . $css)) {
        if ($preload) {
            echo "<link rel=\"preload\" href=\"{$css}\" as=\"stylesheet\">";
        } else {
            echo "<link rel=\"stylesheet\" href=\"{$css}\">";
        }
    } else {
        echo "<!-- File {$css} not found -->";
    }
}

function getLayoutJS(bool $preload = false)
{
    getJS('layout', $preload);
}
function getMainJS(bool $preload = false)
{
    getJS('main', $preload);
}

function getJS(string $js, bool $preload = false)
{
    $js = JS . "/{$js}.js";
    if (file_exists(_ROOT_ . $js)) {
        if ($preload) {
            echo "<link rel=\"preload\" href=\"{$js}\" as=\"script\">";
        } else {
            echo "<script defer src=\"{$js}\"></script>";
        }
    } else {
        echo "<!-- File {$js} not found -->";
    }
}
