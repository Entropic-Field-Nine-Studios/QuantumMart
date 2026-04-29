import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Category } from './category.model';
import { CreateCategoryRequest } from './create-category-request.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  const sampleCategory: Category = {
    id: '123',
    name: 'Sample Category',
    slug: 'sample-category',
    createdAt: '000000000',
    isActive: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: provideHttpClientTesting(),
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET all active categories', () => {
    service.getActiveCategories().subscribe((res) => {
      expect(res).to.deep.equal([sampleCategory]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('GET');

    req.flush([sampleCategory]);
  });

  it('should GET every category', () => {
    service.getAllCategories().subscribe((res) => {
      expect(res).to.deep.equal([sampleCategory]);
    });

    const req = httpMock.expectOne(`${service.baseUrl}/all`);
    expect(req.request.method).to.equal('GET');

    req.flush([sampleCategory]);
  });

  it('should POST to create category', () => {
    const createReq: CreateCategoryRequest = {
      name: 'New Category',
      slug: 'new-category',
    };

    service.createCategory(createReq).subscribe((res) => {
      expect(res).to.deep.equal(sampleCategory);
    });

    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.equal(createReq);

    req.flush(sampleCategory);
  });
});
