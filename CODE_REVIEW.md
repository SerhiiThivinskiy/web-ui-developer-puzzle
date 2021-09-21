## Code smells

- use pipes in templates for content manipulation. Pipes are pure functions and will be called once but not every change detection loop. (`b.authors.join(',')` --> `b.authors | join:',''`)
- instead of method `formatDate` use angular's `date` pipe
- avoid using `innerHTML` for security reason. If it's necessary to use `innerHTML` you should check a text for forbidden symbols. But in this application's case `innerHTML` can be just removed
- use meaningful variables names (`*ngFor="let b of books"` --> `*ngFor="let book of books"`)
- use `a` html tag for cases when new page will be opened, else replace it with `button`.
- would be better to use `picture` html tag to handle case with broken image url and set default image for books
- use semantic html tags for book items (`article, h2`)
- `BookSearchComponent.ngOnInit` subscribes to observable but doesn't  unsubscribe in `ngOnDestroy`. Another solution is to use `async` pipe to auto unsubscribe
- `+state` folder is messy. Move files to folders `books` and `reading-list`
- a lot of methods don't have types for return state and arguments

## Accessibility

- buttons do not have an accessible name
- background and foreground colors do not have a sufficient contrast ratio
- images don't have alt text
- buttons 'Want to read' don't have a sufficient contrast ratio when focused
- search example text is not accessible by keyboard
