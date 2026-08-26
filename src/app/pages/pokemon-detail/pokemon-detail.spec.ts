import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { PokemonDetailPage } from './pokemon-detail';

describe('PokemonDetailPage', () => {
  let component: PokemonDetailPage;
  let fixture: ComponentFixture<PokemonDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailPage],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});