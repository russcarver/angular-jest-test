import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA, Injector, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { noop } from 'rxjs';
import { TestBedComponentOverride, TestBedOverride, TestBedOverrideType, TestBedProviderOverride } from 'test-base-ext';

export interface FixturePayload<T> {
  fixture: ComponentFixture<T>;
  instance: T;
}

export async function beforeEachCompiler(component: any, providers: any[] = [], imports: any[] = [],
                                         declarations: any[] = [], overrides: TestBedOverride<any>[] = []
): Promise<{ fixture: ComponentFixture<typeof component>; instance: typeof component }> {

  if (Array.isArray(component)) {
    component = component[0];
  }

  let configuredModule: typeof TestBed = configureAngularTestingModule(providers, imports, declarations);

  if (overrides.length) {
    overrides.forEach((override: TestBedOverride<any>): void => {
      switch (override.type) {
        case TestBedOverrideType.PROVIDER:
          const providerOverride: TestBedProviderOverride = override.data as TestBedProviderOverride;
          const provider: any = providerOverride.providerFactory
                                  ? providerOverride.providerFactory
                                  : providerOverride.providerValue;
          configuredModule = configuredModule.overrideProvider(providerOverride.token, provider);
          break;
        case TestBedOverrideType.COMPONENT:
          const data: TestBedComponentOverride = override.data as TestBedComponentOverride;
          configuredModule = configuredModule.overrideComponent(data.token, data.override);
          break;
        default:
          throw new Error(`Invalid override: ${override.type}`);
      }
    }, this); // tslint:disable-line
  }

  await configuredModule.compileComponents();
  const fixture: ComponentFixture<typeof component> = TestBed.createComponent(component);
  return {
    fixture,
    instance: fixture.componentInstance
  };
}

export function beforeEachProviderCompiler(providers: Array<any>, imports?: Array<any>): typeof TestBed {
  return configureAngularTestingModule(providers, imports);
}

function configureAngularTestingModule(mockProviders: Array<any> = [],
                                       imports: Array<any> = [],
                                       declarations: Array<any> = []): typeof TestBed {
  mockProviders = [
    ChangeDetectorRef,
    FormBuilder,
    Injector
  ].concat(mockProviders);

  imports = [
    CommonModule,
    HttpClientModule,
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule
  ].concat(imports);

  return TestBed.configureTestingModule({
    declarations,
    imports,
    providers: mockProviders,
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
    ]
  });
}

/**
 * Used to provide an override of "createSpyObj" in Jasmine which is not visible in Jest so that we can use it in mocks.
 * https://stackoverflow.com/questions/45304270/jest-createspyobj
 */
export function createSpyObj(baseName: string, methodNames: string[]): { [key: string]: jasmine.Spy } {
  const obj: { [key: string]: jasmine.Spy } = {};
  for (let i: number = 0; i < methodNames.length; i++) { // tslint:disable-line:prefer-for-of
    obj[methodNames[i]] = jasmine.createSpy(baseName, noop);
  }
  return obj;
}
