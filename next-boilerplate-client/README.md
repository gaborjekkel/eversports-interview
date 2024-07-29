## Summary


When I started to design the project I made the decision to begin with the `DropDown` component, which contained the most challenging UI and functional coding parts. At the beginning I layed down the basic tokens like colors, shadows and components like checkbox, button. Even though most of the UI parts had a single or very limited usage, I tried to imagine how these components can be used on bigger scope, with more developers and supporting different aspects. 


## Technologies


I decided to work with the given technologies. Tailwind worked really similar to an earlier technology I initiated 8-9 years ago and so I could reuse the earlier experience, when working with utility classes. To avoid overrides in CSS, I wrote almost all of the design using this technology. I added [`ramda`](https://ramdajs.com/), a functional library to help me in one case to simplify comparison.

Even if it was a very minor issue, but I was thinking of adding SVGR support to make SVG icons importable and use them as react component. I decided no to do it to make keep the scope of the my changes focused on challenge. 


## UI Components

All the components I see as part of a possible design system are stored in `app/components/ui`. There might be some cases I want to clear below.

### DropDown

When I was building the `DropDown` component I faced the problem of controlling both the opening/closing functionality and designing the component for it. After trying out some libraries like `radix` or packages for popovers, I decided to build my own custom solution. I don't really see the value in taking an external package then fully override for example its design. After some tries, it felt like I got stuck with this problem while time was ticking. My solution adds 20 lines of code without any further complexity to other component and works for this project. On a different, bigger scope, I believe, finding an existing, well tested library could have been a better solution. 

### SelectableList

I load all items at once. It might come with longer response time, but I believe after the loading screen is away the user gets a better experience. First, search is faster. There is no new request, the existing data is filtered. Secondly, the `Select All` option selects all entries and not just the loaded, visible ones. You can also imagine that user has a selection, closes the `DropDown` and reopens it. The selection should be visible in my opinion. As an alternative for loading everything at once could have been a scroll based re-request, so whenever user scroll down to the bottom of the list, request of the next batch is starting.   

### More

Some components could have been also part of the design system, but I had a gut feeling to focus my time to make the application work instead of turning everything into a system. One example is a `Text` component, which could have been design liked: 

```
<Text size={} color={} classes={}>it's a text component</Text>


function Text({ size = defaultValue, color = defaultValue, classes, children }) {
    return (
        <span className={`predefined-text-${size} text-${color} ${classes}`}>
            {children}
        </span>
    )
}
```

or a simple `Flex` to avoid always setting `flex` class on a `div`

```
<Flex onClick={() => something()} classes={'aa bb'}><OtherComponent></Flex>
  
function Flex({ classes, children, ...rest }) {
    return (
        <div className={`flex ${classes}`}>
            {children}
        </div>
    )
}
```