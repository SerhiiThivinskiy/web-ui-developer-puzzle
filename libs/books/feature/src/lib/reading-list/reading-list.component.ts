import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReadingListItem } from '@tmo/shared/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  private componentAlive$: Subject<void> = new Subject<void>();

  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnDestroy() {
    this.componentAlive$.next();
    this.componentAlive$.complete();
  }

  removeFromReadingList(item: ReadingListItem): void {
    this.store.dispatch(removeFromReadingList({ item }));
    this.openSnackBar(item);
  }

  private openSnackBar(item: ReadingListItem): void {
    const snackBarRef = this.snackBar.open(`${item.title} was removed!`, 'Undo', {
      duration: 5000
    });
    snackBarRef.onAction()
      .pipe(takeUntil(this.componentAlive$))
      .subscribe(() => {
        this.store.dispatch(addToReadingList({
          book: { ...item, id: item.bookId }
        }));
      });
  }
}
