import {
  ChecklistBlock,
  ChecklistItem,
  ChecklistModel
} from "./checklist.interface";

export let emptyChecklist: ChecklistModel = {
  title: "",
  data: [
    {
      title: "",
      order: 0,
      items: [
        {
          title: "",
          order: 0,
          checked: false,
          help: ""
        }
      ]
    }
  ]
};

export let defaultChecklist: ChecklistModel = {
  title: "All Templates",
  data: [
    {
      title: "",
      order: 0,
      selected: true,
      items: [{ title: "", order: 0, checked: false, help: "" }]
    },
    {
      title: "HTML <head>",
      order: 1,
      selected: true,
      items: [
        {
          title: "Doctype set to html5",
          order: 2,
          checked: false,
          help: "&lt;!doctype html&gt; &lt;!-- HTML5 --&gt;"
        },
        {
          title: "Charset is UTF-8",
          order: 60,
          help: '&lt;meta charset="utf-8"&gt;',
          checked: false
        },
        {
          title: "Language specified",
          order: 65,
          help: 'Specify language on your HTML tag: &lt;html lang="en"&gt;',
          checked: false
        },
        {
          title: "Meta viewport",
          order: 61,
          help:
            '&lt;meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"&gt; [Meta viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)',
          checked: false
        },
        {
          title: "Title and metadata",
          order: 62,
          help:
            "Title should be shorter than 55 characters. Important for ranking by search engines and as fallback for shares on social sites. You can generate metadata via [webcode.tools](https://webcode.tools/meta-tags-generator). I also recommend to check and understand these metadata: [About title](https://moz.com/learn/seo/title-tag) and [Meta description](https://moz.com/learn/seo/meta-description)",
          checked: false
        },
        {
          title: "Favicons",
          order: 63,
          help:
            "You can generate your icons by [faviconmatic](http://www.favicomatic.com/) or [favicon.io](https://favicon.io/). Beware that there are specific icons set for Microsoft web apps and Apple web apps.",
          checked: false
        },
        {
          title: "Canonical",
          order: 64,
          help:
            "Use canonical tag to avoid duplicated content: [support.google.com](https://support.google.com/webmasters/answer/139066?hl=en)",
          checked: false
        },
        {
          title: "CSS first",
          order: 66,
          help: "Make sure all CSS files are loaded prior to javascript files.",
          checked: false
        }
      ]
    },
    {
      title: "HTML",
      order: 3,
      selected: true,
      items: [
        {
          title: "Valid HTML",
          order: 5,
          help:
            "For optimal indexing. Validate via [w3c validation service](https://validator.w3.org/)",
          checked: false
        },
        {
          title: "Checked in major supported browsers and devices",
          order: 10,
          help:
            "IE11 and above, Edge, Chrome, Safari, Opera, Chrome for android, Safari for IOs. Check browser usage on [caniuse.com](https://caniuse.com/usage-table)",
          checked: false
        },
        {
          title: "Meaningfull animations",
          order: 11,
          help:
            "Animations are used either  for keeping context (e.g. animated side menu on mobile phones) or tell a story and help to understand a process. Animations should not be used just for fun (it consumes battery and disturb user from real content)",
          checked: false
        },
        {
          title: "Error pages",
          order: 12,
          help: "Error pages like 404, 503 are implemented and work.",
          checked: false
        },
        {
          title: "Semantic HTML",
          order: 69,
          help:
            "Make sure your web usees right semantic tags like &lt;nav&gt; &lt;main&gt; &lt;section&gt; &lt;article&gt; etc.",
          checked: false
        },
        {
          title: "All external links are valid",
          order: 92,
          help:
            "Be sure that all links pointing to outer internet are working correctly. Use [W3C Link checker](https://validator.w3.org/checklink)",
          checked: false
        },
        {
          title: "Typography done right",
          order: 93,
          help:
            "Follow basic [typographic rules](https://practicaltypography.com/summary-of-key-rules.html)",
          checked: false
        },
        {
          title: "Tables",
          order: 107,
          help: "Tables are used to display only tabular data",
          checked: false
        },
        {
          title: "Unique IDs",
          order: 108,
          help: "Element IDs are unique",
          checked: false
        },
        {
          title: "DOM nesting",
          order: 109,
          help:
            "DOM nesting depth does not exceed 12 levels. It is just a recommendation, which speed up page rendering.",
          checked: false
        }
      ]
    },
    {
      title: "HTML for public Web",
      order: 14,
      selected: true,
      items: [
        {
          title: "Facebook Open Graph",
          order: 15,
          checked: false,
          help:
            "Programatically changes title and picture for shares within facebook [developers.facebook.com](https://developers.facebook.com/docs/sharing). Generate your Open Graph via [webcode.tools](https://webcode.tools/open-graph-generator)"
        },
        {
          title: "Twitter Cards",
          order: 16,
          help:
            "Programatically changes title and picture for shares within twitter [developer.twitter.com](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started). Generate your Twitter cards via [webcode.tools](https://webcode.tools/twitter-card-generator)",
          checked: false
        },
        {
          title: "Google Rich Snippers",
          order: 17,
          help:
            "„Rich Snippets“ for improved display in google search results. Especially important for eshops. [Intro to Structured data](https://developers.google.com/search/docs/guides/intro-structured-data). For testing use this tool: [Google Rich Results Testing Tool](https://search.google.com/test/rich-results). Generate your structured data via [webcode.tools](https://webcode.tools/microdata-generator)",
          checked: false
        },
        {
          title: "Structured title usage",
          order: 18,
          help:
            "Structure headlines in your web consistently. More on [headers](https://www.hobo-web.co.uk/headers/)",
          checked: false
        },
        {
          title: "RSS feed",
          order: 67,
          help: "Provide RSS feed link if your web build around articles.",
          checked: false
        }
      ]
    },
    {
      title: "CSS",
      order: 83,
      selected: true,
      items: [
        {
          title: "Responsive across browsers and devices",
          order: 84,
          checked: false,
          help:
            "Works on mobile, tablet, desktop. CSS grid or flexbox is recommended to use."
        },
        { title: "Print styles", order: 85, help: "", checked: false },
        {
          title: "Vendor prefixes",
          order: 86,
          help:
            "Vendor prefixes should be automatically generated by your build tool according supported browsers.",
          checked: false
        },
        { title: "Minified CSS", order: 87, help: "", checked: false },
        {
          title: "Testing: CSS is valid",
          order: 88,
          help:
            "CSS validation tool: [w3 css validator](https://jigsaw.w3.org/css-validator)",
          checked: false
        },
        {
          title: "Testing: Read direction",
          order: 89,
          help:
            "Pages were tested in different languages with suport of LTR and RTL read direction",
          checked: false
        },
        {
          title: "Testing: Desktop browsers",
          order: 90,
          help: "Chrome, Firefox, Safari, Internet Explorer, Edge",
          checked: false
        },
        {
          title: "Testing: Mobile browsers",
          order: 91,
          help: "",
          checked: false
        },
        {
          title: "Naming conventions",
          order: 111,
          help: "Naming conventions are used (BEM, )",
          checked: false
        }
      ]
    },
    {
      title: "Javascript",
      order: 94,
      selected: true,
      items: [
        {
          title: "No inline javascript used",
          order: 95,
          checked: false,
          help: "you should not use inline JS events and scripts"
        },
        {
          title: "JS code minified",
          order: 96,
          help: "",
          checked: false
        },
        {
          title: "No script tag",
          order: 97,
          help:
            "&lt;noscript&gt; tag is present to give feedback in browsers with no JS support",
          checked: false
        },
        {
          title: "Non blocking JS resources",
          order: 98,
          help:
            "JS script should use async or deferred tags to enable loading in async manner.",
          checked: false
        }
      ]
    },
    {
      title: "Images",
      order: 99,
      selected: true,
      items: [
        {
          title: "Alternative text for images",
          order: 100,
          checked: false,
          help:
            "Alt tag for all images. See [img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)"
        },
        {
          title: "Images in future format",
          order: 101,
          help:
            "Images should be in webP or even better Avif format. You can use [webp-converter](https://webp-converter.com/) or [avif-converter](https://avif-converter.online/)",
          checked: false
        },
        {
          title: "Correct image sizes for different devices",
          order: 102,
          help:
            "Use &lt;picture&gt; with srcset tag. This can help you with right image breakpoints: [responsivebreakpoints.com/](https://www.responsivebreakpoints.com)",
          checked: false
        },
        {
          title: "SVG icons",
          order: 103,
          help:
            "The best solution for modern web are SVG icons via separate file with SVG definitions. Article about SVG icons including browser issues on [fvsch.com](https://fvsch.com/code/svg-icons/how-to/). For creation of custom SVG definition files use [icomoon.io](https://icomoon.io/), it also includes 5500+ free icons. Icons should have description text beside or at least description on hover. If you are ok with predefined set of icons, you can use [fontawesome](https://fontawesome.com/)",
          checked: false
        },
        {
          title: "Retina display support",
          order: 104,
          help: "Web works on hi resolution displays (even desktops)",
          checked: false
        },
        {
          title: "Lazy loading",
          order: 105,
          help: "images are lazy loaded with &lt;img loading=lazy&gt;",
          checked: false
        },
        {
          title: "Width and height",
          order: 106,
          help:
            "Width and height &lt;img&gt; attributes are set to avoid page collapsing, before images are loaded.",
          checked: false
        }
      ]
    },
    {
      title: "Webfonts",
      order: 75,
      selected: true,
      items: [
        {
          title: "Font type & support",
          order: 76,
          checked: false,
          help:
            "Use WOFF, WOFF2 and TTF, those have wide support in browsers. You can use [fontsquirrel](https://www.fontsquirrel.com/tools/webfont-generator) to generate font sets."
        },
        {
          title: "Font size in KB",
          order: 79,
          help:
            "Font size shod not exceed 50KB per font or 100KB for all fonts. Beware that font loading can slow down the whole page rendering and decrease user experience quite a lot.",
          checked: false
        },
        {
          title: "Font loader",
          order: 82,
          help:
            "Unfortunately fonts has no load events by default. You can use [webfontloader](https://github.com/typekit/webfontloader) to get this functionality and avoid flickering and unintened waits.",
          checked: false
        }
      ]
    },
    {
      title: "Code & Styelguide",
      order: 21,
      selected: true,
      items: [
        {
          title: "README.md",
          order: 22,
          help:
            "Repository contains README file with instructions on how to install, build and deploy the project",
          checked: false
        },
        {
          title: "Test coverage",
          order: 23,
          help:
            "Code is unit tested in reasonable extent. In complex apps tests are extended to integration tests. In case on content-heave webs e2e test are recommended",
          checked: false
        },
        {
          title: "Production quality code",
          order: 24,
          help:
            "Production build produces a minified code with minimal set of CSS. You can use [unused-css](https://unused-css.com/) for webpage analysis or avoid unused CSS during build time with [purgecss](https://purgecss.com/)",
          checked: false
        },
        {
          title: "Follow conventions",
          order: 25,
          help:
            "Code quality and style is similar, whoever in team produced it. Code is formatted in unified style. Use [.editorconfig](http://editorconfig.org/) and or [Prettier](https://prettier.io/) to automatically format code, based on predefined rules.",
          checked: false
        },
        {
          title: "Code quality",
          order: 26,
          help:
            "Code is checked programatically by a tools. For CSS use [stylelint](https://github.com/stylelint/stylelint), for javascript and its supersets use: [TSLint](https://palantir.github.io/tslint/), [ESLint](https://eslint.org/).",
          checked: false
        }
      ]
    },
    {
      title: "Accessibility",
      order: 27,
      selected: true,
      items: [
        {
          title: "Colour contrast sufficient",
          order: 28,
          checked: false,
          help:
            "If you are not sure about right contrast use [Color contrast checker](https://webaim.org/resources/contrastchecker/). For complex web analysis use [Check my colours](http://www.checkmycolours.com/)"
        },
        {
          title: "Colour blind friendly",
          order: 29,
          help:
            "You can see how your colour combinations are seen by colour blinded: [adobe color accessibility](https://color.adobe.com/create/color-accessibility) or [Paltton.com](http://paletton.com/)",
          checked: false
        },
        {
          title: "Button size enough for touch screens",
          order: 30,
          checked: false,
          help:
            "More on button size by [Smashing magazine](https://www.smashingmagazine.com/2012/02/finger-friendly-design-ideal-mobile-touchscreen-target-sizes/)"
        },
        {
          title: "WAI-ARIA, where applicable",
          order: 32,
          checked: false,
          help:
            "Implement [Aria](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) tags for better accessibility by visually impaired users."
        },
        {
          title: "Form input with proper input type",
          order: 31,
          checked: false,
          help: "Important for mobile devices to open appropriate keyboard!"
        },
        {
          title: "WCAG check, where applicable",
          order: 33,
          checked: false,
          help:
            "Test in [Web Accessibility Checker](https://achecker.ca/checker/index.php)"
        },
        {
          title: "Tabindexes done right",
          order: 35,
          help:
            "[tabindex](https://www.w3schools.com/tags/att_global_tabindex.asp) should be set per each active element. Ideally web designer already sorted active elements in right order (most important in top - can vary by language) and tabindexes are no longer needed.",
          checked: false
        },
        {
          title: "Appropriate number of active elements in page",
          order: 36,
          help:
            "Excessive number of active elements can make web totally unusable by disabled users.",
          checked: false
        },
        {
          title: "Alternative text for images",
          order: 59,
          help:
            "Alt tag for all images. See [img element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)",
          checked: false
        }
      ]
    },
    {
      title: "Speed and performace",
      order: 37,
      selected: true,
      items: [
        {
          title: "PageSpeed",
          order: 38,
          checked: false,
          help:
            "Web passes [PageSpeeed](https://developers.google.com/speed/pagespeed/insights/) tests with reasonable results"
        },
        {
          title: "Lighthouse",
          order: 39,
          help:
            "Web pasees [Lighthouse](https://developers.google.com/web/tools/lighthouse/) metrics with reasonable results",
          checked: false
        },
        {
          title: "Inline CSS for above the fold content",
          order: 49,
          help:
            'CSS styles for what is loaded on initialy visible part of page should be placed into &lt;style&gt; tag, rather than in &lt;link href="" &gt;',
          checked: false
        },
        {
          title: "HTTP/2 protocol",
          order: 52,
          help: "Upgrade your server to https with HTTP/2",
          checked: false
        },
        {
          title: "Redirect http to https",
          order: 53,
          help:
            "Redirect all requests from http to https to enhance speed with HTTP/2",
          checked: false
        },
        {
          title: "Static generated pages used if possible",
          order: 54,
          help:
            "If your architecture alows it, consider using static generated pages, served over CDN.",
          checked: false
        },
        {
          title: "Service workers",
          order: 55,
          help: "Cache assets on client side via service workers.",
          checked: false
        },
        {
          title: "Web workers",
          order: 56,
          help:
            "In case your web or app contains some heavy javascript computation try to outsource them to web workers. It will improve fluent performance of animations and scrolling of your web. You can use [Comlink](https://github.com/GoogleChromeLabs/comlink) which turns webworker messaging api to more comfortable promises",
          checked: false
        },
        {
          title: "Throttle, debounce and memoize functions used",
          order: 57,
          help:
            "In case of repetitive calls in javascript, throttle, debounce and memoize functions can significantly improve your performance ",
          checked: false
        },
        {
          title: "Assets and scripts are lazy loaded",
          order: 58,
          help:
            "Images, videos, scripts and other static content is loaded on demand when needed. Bundled JS should be split to reasonable number of pieces, which are loaded only when needed.",
          checked: false
        }
      ]
    },
    {
      title: "Web launch & SEO",
      order: 40,
      selected: true,
      items: [
        {
          title: "Google analytics",
          order: 41,
          checked: false,
          help: "Register web in google analytics or similar tool"
        },
        {
          title: "Google search conosle",
          order: 42,
          help:
            "Register web in [Google Search console](https://www.google.com/webmasters/tools/)",
          checked: false
        },
        {
          title: "Tests passed",
          order: 43,
          help: "At least manual tests passed",
          checked: false
        },
        {
          title: "Production build is clean",
          order: 44,
          help:
            "There are no unnecessary files on the production server. No files like .gitignore, node_modules etc.",
          checked: false
        },
        {
          title: "robots.txt and humans.txt",
          order: 46,
          help:
            "In root of the web there are robots.txt and humans.txt, optionally also manifest.json",
          checked: false
        },
        {
          title: "sitemap.xml",
          order: 47,
          help:
            "sitemap.xml is present and regenerated once structure of the web changes.",
          checked: false
        },
        {
          title: "Compression",
          order: 48,
          help: "Content served by server is compressed (gzip or brotli)",
          checked: false
        },
        {
          title: "Remove code comments",
          order: 72,
          help: "All Unnecessary comments should be removed",
          checked: false
        },
        {
          title: "Adblocker ready",
          order: 74,
          help:
            "Be sure you test your page with adblocker on. Beware that images and script with 'ad' (or similar strings) in url can be blocked.",
          checked: false
        }
      ]
    },
    {
      title: "Security",
      order: 70,
      selected: true,
      items: [
        {
          title: "Noopener",
          order: 71,
          checked: false,
          help:
            'rel="noopener" attribute should be used for any external links with target="_blank". See more on [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/noopener)'
        },
        {
          title: "HTTPS",
          order: 73,
          help:
            "Secure your data transfers with https certificate. Can be done free via [letsencrypt](https://letsencrypt.org/) or on DNS level by [cloudflare](https://www.cloudflare.com/en-gb/ssl/)",
          checked: false
        },
        {
          title: "Inputs",
          order: 110,
          help:
            "All user inputs are “sanitized”.  Characters like '&lt;' and '&gt;' are replaced or removed",
          checked: false
        },
        {
          title: "Security check",
          order: 112,
          help:
            "No input sql injection is possible. Header have all necessary settings like X-Frame-Options and Content-Security-Policy. Check headers by [serpworx](https://www.serpworx.com/check-security-headers/)",
          checked: false
        }
      ]
    }
  ]
};
