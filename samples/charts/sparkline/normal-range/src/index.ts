import { IgcSparklineModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineCoreModule } from 'igniteui-webcomponents-charts';
import { IgcSparklineComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { Visibility } from 'igniteui-webcomponents-core';
import { SparklineSharedData } from './SparklineSharedData';

ModuleManager.register(
    IgcSparklineCoreModule,
    IgcSparklineModule
);

// all done ex-range update labels

export class SparklineNormalRange {

    private sparkline: IgcSparklineComponent;
    public data: any[] = [];
    private minRangeLabel: any;
    private maxRangeLabel: any;

    constructor() {

        this.onMinSliderChanged = this.onMinSliderChanged.bind(this);
        this.onMaxSliderChanged = this.onMaxSliderChanged.bind(this);
        this.onRangeVisibilityChanged = this.onRangeVisibilityChanged.bind(this);
        this.data = SparklineSharedData.getSharedData();

        this.sparkline = document.getElementById('sparkline') as IgcSparklineComponent;
        this.sparkline.dataSource = this.data;

        let rangeVisibility = document.getElementById('rangeVisibility');
        rangeVisibility!.addEventListener('change', this.onRangeVisibilityChanged);

        let minRange = document.getElementById('minRange');
        minRange!.addEventListener('change', this.onMinSliderChanged);

        let maxRange = document.getElementById('maxRange');
        maxRange!.addEventListener('change', this.onMaxSliderChanged);

        this.minRangeLabel = document.getElementById('minRangeLabel');
        this.maxRangeLabel = document.getElementById('maxRangeLabel');
    }

    public onRangeVisibilityChanged(e: any) {
        const selection = e.target.checked as boolean;

        if (selection) {
            this.sparkline.normalRangeVisibility = Visibility.Visible;
        }
        else {
            this.sparkline.normalRangeVisibility = Visibility.Collapsed;
        }
    }

    public onMinSliderChanged(e: any) {
        const value: number = parseFloat(e.target.value);
        this.sparkline.normalRangeMinimum = value;
      this.minRangeLabel.textContent = value;
    }

    public onMaxSliderChanged(e: any) {
        const value: number = parseFloat(e.target.value);
        this.sparkline.normalRangeMaximum = value;
        this.maxRangeLabel.textContent = value;
    }
}

new SparklineNormalRange();
